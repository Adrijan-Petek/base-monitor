#!/usr/bin/env node
import { CONFIG } from '../config.js';
import { ethers } from 'ethers';
import { pool, initDb } from '../db/index.js';

const provider = new ethers.JsonRpcProvider(CONFIG.BASE_RPC);

async function storeLog(log, blockTimestamp) {
  const client = await pool.connect();
  try {
    const topics = JSON.stringify(log.topics);
    await client.query(
      `INSERT INTO reward_events(block_number, tx_hash, log_index, contract_address, topics, data, block_timestamp)
       VALUES($1,$2,$3,$4,$5,$6,to_timestamp($7))
       ON CONFLICT DO NOTHING`,
      [log.blockNumber, log.transactionHash, log.logIndex, log.address, topics, log.data, blockTimestamp]
    );
  } finally {
    client.release();
  }
}

export async function collectLatest(numBlocks=CONFIG.NUM_BLOCKS) {
  const latest = await provider.getBlockNumber();
  const from = Math.max(CONFIG.START_BLOCK, latest - numBlocks + 1);
  console.log(`Collecting logs from blocks ${from}..${latest}`);
  for (let b = from; b <= latest; b++) {
    try {
      const block = await provider.getBlock(b);
      const logs = await provider.getLogs({ fromBlock: b, toBlock: b });
      for (const log of logs) {
        await storeLog(log, block.timestamp);
      }
      console.log(`Block ${b}: stored ${logs.length} logs.`);
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
