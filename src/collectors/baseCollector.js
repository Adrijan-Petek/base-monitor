#!/usr/bin/env node
import { CONFIG } from '../config.js';
import { ethers } from 'ethers';
import { pool, initDb } from '../db/index.js';

const provider = new ethers.JsonRpcProvider(CONFIG.BASE_RPC);

// Farcaster detection helper functions
function isFarcasterRelated(contractAddress, from, to, amount) {
  if (!CONFIG.ENABLE_FARCASTER_BLOCKCHAIN_DETECTION) return false;

  // Check if contract is known Farcaster contract
  if (CONFIG.FARCASTER_CONTRACTS.includes(contractAddress.toLowerCase())) {
    return true;
  }

  // Check if sender/receiver is known Farcaster address
  if (CONFIG.FARCASTER_ADDRESSES.includes(from.toLowerCase()) ||
      CONFIG.FARCASTER_ADDRESSES.includes(to.toLowerCase())) {
    return true;
  }

  // Check for Base Rewards contract specifically
  if (contractAddress.toLowerCase() === '0x4c79b8c9cb0bd62b047880603a9b0c734f1ff0fcf') {
    return true;
  }

  // Could add more sophisticated detection here:
  // - Check for specific amount patterns
  // - Look for transactions to/from .base.eth names
  // - Monitor for Frame interaction patterns

  return false;
}

function getContractType(contractAddress) {
  const addr = contractAddress.toLowerCase();

  if (addr === '0x4c79b8c9cb0bd62b047880603a9b0c734f1ff0fcf') {
    return 'base_rewards';
  }

  // Base Builder Rewards contract
  if (addr === '0x1fc10ef15e041c5d3c54042e52eb0c54cb9b710c') {
    return 'base_builder_rewards';
  }

  // Base App Reward Token contract
  if (addr === '0x1986cc18d8ec757447254310d2604f85741aa732') {
    return 'base_app_rewards';
  }

  // Base Builder NFTs contract
  if (addr === '0x8dc80a209a3362f0586e6c116973bb6908170c84') {
    return 'base_builder_nfts';
  }

  // Farcaster Token contract
  if (addr === '0x6921b130d297cc43754afba22e5eac0fbf8db75b') {
    return 'farcaster_token';
  }

  if (CONFIG.FARCASTER_CONTRACTS.includes(addr)) {
    return 'farcaster_ecosystem';
  }

  return 'unknown';
}

function getTransactionType(from, to) {
  const fromAddr = from.toLowerCase();
  const toAddr = to.toLowerCase();

  // Base Rewards contract distributions
  if (fromAddr === '0x4c79b8c9cb0bd62b047880603a9b0c734f1ff0fcf') {
    return 'base_rewards_distribution';
  }

  // Base Builder Rewards distributions
  if (fromAddr === '0x1fc10ef15e041c5d3c54042e52eb0c54cb9b710c') {
    return 'base_builder_rewards_distribution';
  }

  // Base App Rewards distributions
  if (fromAddr === '0x1986cc18d8ec757447254310d2604f85741aa732') {
    return 'base_app_rewards_distribution';
  }

  // Base Builder NFT distributions
  if (fromAddr === '0x8dc80a209a3362f0586e6c116973bb6908170c84') {
    return 'base_builder_nft_distribution';
  }

  // Farcaster Token distributions
  if (fromAddr === '0x6921b130d297cc43754afba22e5eac0fbf8db75b') {
    return 'farcaster_token_distribution';
  }

  return 'transfer';
}

function identifyPotentialFarcasterUser(from, to) {
  const fromAddr = from.toLowerCase();
  const toAddr = to.toLowerCase();

  // If receiving from any of the reward contracts, likely a rewarded user
  const rewardContracts = [
    '0x4c79b8c9cb0bd62b047880603a9b0c734f1ff0fcf', // Base Rewards
    '0x1fc10ef15e041c5d3c54042e52eb0c54cb9b710c', // Base Builder Rewards
    '0x1986cc18d8ec757447254310d2604f85741aa732', // Base App Rewards
    '0x8dc80a209a3362f0586e6c116973bb6908170c84', // Base Builder NFTs
    '0x6921b130d297cc43754afba22e5eac0fbf8db75b'  // Farcaster Token
  ];

  if (rewardContracts.includes(fromAddr)) {
    return to; // Recipient is likely a rewarded user
  }

  // If sending to reward contracts, might be a user interacting with rewards
  if (rewardContracts.includes(toAddr)) {
    return from; // Sender might be a user
  }

  return null;
}

async function storeLog(log, blockTimestamp) {
  const client = await pool.connect();
  try {
    const topics = JSON.stringify(log.topics);

    // Try to decode ERC20 transfer
    let decoded = null;
    let farcasterRelated = false;
    let farcasterMetadata = null;

    if (log.topics[0] === '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef' && log.topics.length >= 3) {
      try {
        const from = '0x' + log.topics[1].slice(26);
        const to = '0x' + log.topics[2].slice(26);
        const amount = BigInt(log.data).toString();
        decoded = { from, to, amount };

        // Check if this transaction is Farcaster-related
        farcasterRelated = isFarcasterRelated(log.address, from, to, amount);
        if (farcasterRelated) {
          farcasterMetadata = {
            contractType: getContractType(log.address),
            transactionType: getTransactionType(from, to),
            amount: ethers.formatEther(amount),
            potentialFarcasterUser: identifyPotentialFarcasterUser(from, to)
          };
        }
      } catch (e) {
        console.log('Could not decode transfer:', e.message);
      }
    }

    await client.query(
      `INSERT INTO reward_events(block_number, tx_hash, log_index, contract_address, topics, data, block_timestamp, decoded_data, farcaster_related, farcaster_metadata)
       VALUES($1,$2,$3,$4,$5,$6,to_timestamp($7),$8,$9,$10)
       ON CONFLICT DO NOTHING`,
      [log.blockNumber, log.transactionHash, log.logIndex, log.address, topics, log.data, blockTimestamp, JSON.stringify(decoded), farcasterRelated, JSON.stringify(farcasterMetadata)]
    );
  } finally {
    client.release();
  }
}

export async function collectLatest(numBlocks=CONFIG.NUM_BLOCKS) {
  const latest = await provider.getBlockNumber();
  const from = Math.max(CONFIG.START_BLOCK, latest - numBlocks + 1);
  console.log(`Collecting reward logs from blocks ${from}..${latest}`);

  // ERC20 Transfer event signature
  const transferTopic = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

  for (let b = from; b <= latest; b++) {
    try {
      const block = await provider.getBlock(b);
      let logs;

      if (CONFIG.REWARD_CONTRACTS && CONFIG.REWARD_CONTRACTS.length > 0) {
        // Filter for specific reward contracts
        logs = await provider.getLogs({
          fromBlock: b,
          toBlock: b,
          address: CONFIG.REWARD_CONTRACTS,
          topics: [transferTopic] // ERC20 Transfer events
        });
        console.log(`Block ${b}: found ${logs.length} reward transfers.`);
      } else {
        // Fallback: collect all logs (for investigation)
        logs = await provider.getLogs({ fromBlock: b, toBlock: b });
        console.log(`Block ${b}: stored ${logs.length} logs.`);
      }

      for (const log of logs) {
        await storeLog(log, block.timestamp);
      }

    } catch (e) {
      console.error('Error collecting block', b, e.message);
    }
  }
}

async function main() {
  await initDb();
  await collectLatest();
  await pool.end();
}

if (process.argv[1].endsWith('baseCollector.js')) {
  main().catch(err=>{ console.error(err); process.exit(1);});
}
