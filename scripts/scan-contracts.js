#!/usr/bin/env node
import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

console.log('🔧 Loading contract scanner...');

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const BASE_RPC = process.env.BASE_RPC || 'https://mainnet.base.org';
const SCAN_BLOCKS = parseInt(process.env.SCAN_BLOCKS || '1000'); // Number of recent blocks to scan
const CONFIG_PATH = path.resolve(__dirname, '../src/config.js');

console.log('✅ Configuration loaded');
console.log(`📡 RPC: ${BASE_RPC}`);
console.log(`📊 Scan Blocks: ${SCAN_BLOCKS}`);

// Reward contract patterns to identify contract types
const CONTRACT_PATTERNS = {
  farcaster: {
    name: 'Farcaster',
    patterns: [
      /farcaster/i,
      /warpcast/i,
      /cast/i,
      /social/i,
      /fid/i
    ],
    events: [
      'Transfer(address,address,uint256)',
      'Reward(address,uint256)',
      'Claim(address,uint256)'
    ]
  },
  baseApp: {
    name: 'Base App',
    patterns: [
      /base.*app/i,
      /mini.*app/i,
      /app.*reward/i,
      /trading.*incentive/i,
      /social.*reward/i
    ],
    events: [
      'Transfer(address,address,uint256)',
      'Reward(address,uint256)',
      'Claim(address,uint256)'
    ]
  },
  baseBuilder: {
    name: 'Base Builder',
    patterns: [
      /builder/i,
      /build/i,
      /developer/i,
      /grant/i,
      /incentive/i
    ],
    events: [
      'Transfer(address,address,uint256)',
      'Reward(address,uint256)',
      'Claim(address,uint256)'
    ]
  }
};

// Known contract addresses to exclude (already identified)
const KNOWN_CONTRACTS = {
  farcaster: [
    '0x4c79b8c9cB0BD62B047880603a9B0c734f1FF0FcF',
    '0x1fc10ef15e041c5d3c54042e52eb0c54cb9b710c',
    '0x8dc80a209a3362f0586e6c116973bb6908170c84',
    '0x6921b130d297cc43754afba22e5eac0fbf8db75b',
    '0xd15fE25eD0Dba12fE05e7029C88b10C25e8880E3'
  ],
  baseApp: [
    '0x1986cc18d8ec757447254310d2604f85741aa732'
  ],
  baseBuilder: [] // Will be populated from remaining contracts
};

class ContractScanner {
  constructor() {
    this.provider = new ethers.JsonRpcProvider(BASE_RPC);
    this.foundContracts = {
      farcaster: new Set(),
      baseApp: new Set(),
      baseBuilder: new Set()
    };
  }

  async scanForContracts() {
    console.log('🔍 Starting contract scan...');
    console.log(`📡 Connected to: ${BASE_RPC}`);

    try {
      const latestBlock = await this.provider.getBlockNumber();
      const fromBlock = Math.max(0, latestBlock - SCAN_BLOCKS);

      console.log(`📊 Scanning blocks ${fromBlock} to ${latestBlock} (${SCAN_BLOCKS} blocks)`);

      // Get all transactions in the block range
      const contracts = new Set();

      // First, include all known contracts from config
      console.log('📋 Including known contracts from configuration...');
      for (const contract of KNOWN_CONTRACTS.farcaster) {
        this.foundContracts.farcaster.add(contract);
      }
      for (const contract of KNOWN_CONTRACTS.baseApp) {
        this.foundContracts.baseApp.add(contract);
      }
      for (const contract of KNOWN_CONTRACTS.baseBuilder) {
        this.foundContracts.baseBuilder.add(contract);
      }

      console.log(`📊 Starting with ${this.foundContracts.farcaster.size + this.foundContracts.baseApp.size + this.foundContracts.baseBuilder.size} known contracts`);

      // Then try to discover and analyze new contracts
      console.log(`🔍 Looking for contract creation events...`);
      try {
        const creationLogs = await this.provider.getLogs({
          topics: [],
          fromBlock: fromBlock,
          toBlock: latestBlock
        });

        console.log(`� Found ${creationLogs.length} total logs, filtering for contract creations...`);

        // Filter logs that might indicate contract deployments
        // This is a simplified approach - in practice, we'd need more sophisticated detection
        for (const log of creationLogs.slice(0, 1000)) { // Limit for testing
          if (log.address && log.address !== '0x0000000000000000000000000000000000000000') {
            // Check if this address has code (is a contract)
            try {
              const code = await this.provider.getCode(log.address);
              if (code !== '0x') {
                contracts.add(log.address);
              }
            } catch (error) {
              // Skip if can't get code
            }
          }
        }
      } catch (error) {
        console.warn(`⚠️ Error getting logs:`, error.message);
        // Fallback: try to get some known contracts or use a different approach
        console.log('🔄 Using fallback contract discovery...');
        // For now, just add some known contracts to test the categorization
        contracts.add('0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'); // Known contract
      }

      console.log(`📋 Found ${contracts.size} total contracts to analyze`);

      // Analyze each new contract (skip known ones since they're already categorized)
      const analyzedContracts = [];
      for (const contractAddress of contracts) {
        if (!contractAddress) continue;

        // Skip if already categorized as known
        const allKnown = [...KNOWN_CONTRACTS.farcaster, ...KNOWN_CONTRACTS.baseApp, ...KNOWN_CONTRACTS.baseBuilder];
        if (allKnown.includes(contractAddress.toLowerCase())) {
          continue;
        }

        try {
          const analysis = await this.analyzeContract(contractAddress);
          if (analysis) {
            analyzedContracts.push(analysis);
          }
        } catch (error) {
          console.warn(`⚠️ Error analyzing contract ${contractAddress}:`, error.message);
        }
      }

      // Categorize contracts
      this.categorizeContracts(analyzedContracts);

      // Update configuration
      await this.updateConfig();

      console.log('✅ Contract scan completed successfully!');

    } catch (error) {
      console.error('❌ Error during contract scan:', error.message);
      throw error;
    }
  }

  async analyzeContract(contractAddress) {
    try {
      // Skip known contracts
      const allKnown = [...KNOWN_CONTRACTS.farcaster, ...KNOWN_CONTRACTS.baseApp, ...KNOWN_CONTRACTS.baseBuilder];
      if (allKnown.includes(contractAddress.toLowerCase())) {
        return null;
      }

      console.log(`🔍 Analyzing contract: ${contractAddress}`);

      // Get contract bytecode
      const code = await this.provider.getCode(contractAddress);
      if (code === '0x') {
        return null; // Not a contract
      }

      // Try to get contract name/symbol (ERC20/ERC721)
      let contractName = '';
      let contractSymbol = '';

      try {
        const erc20Abi = [
          'function name() view returns (string)',
          'function symbol() view returns (string)'
        ];
        const contract = new ethers.Contract(contractAddress, erc20Abi, this.provider);

        contractName = await contract.name().catch(() => '');
        contractSymbol = await contract.symbol().catch(() => '');
      } catch (error) {
        // Not an ERC20/ERC721 contract
      }

      // Check recent transactions for patterns
      const recentTxs = await this.getContractTransactions(contractAddress);

      return {
        address: contractAddress,
        name: contractName,
        symbol: contractSymbol,
        bytecode: code,
        transactionCount: recentTxs.length,
        hasRewardEvents: this.hasRewardEvents(recentTxs)
      };

    } catch (error) {
      console.warn(`⚠️ Error analyzing ${contractAddress}:`, error.message);
      return null;
    }
  }

  async getContractTransactions(contractAddress, blocks = 1000) {
    try {
      const latestBlock = await this.provider.getBlockNumber();
      const fromBlock = Math.max(0, latestBlock - blocks);

      const logs = await this.provider.getLogs({
        address: contractAddress,
        fromBlock: fromBlock,
        toBlock: latestBlock
      });

      return logs;
    } catch (error) {
      return [];
    }
  }

  hasRewardEvents(transactions) {
    // Check if contract emits reward-related events
    const rewardSignatures = [
      'Transfer(address,address,uint256)',
      'Reward(address,uint256)',
      'Claim(address,uint256)',
      'Mint(address,uint256)',
      'Distribute(address,uint256)'
    ];

    for (const tx of transactions) {
      if (tx.topics && tx.topics.length > 0) {
        const eventSignature = tx.topics[0];
        // Check if any topic matches reward event signatures
        for (const sig of rewardSignatures) {
          const hash = ethers.keccak256(ethers.toUtf8Bytes(sig));
          if (eventSignature === hash) {
            return true;
          }
        }
      }
    }

    return false;
  }

  categorizeContracts(contracts) {
    console.log(`\n📊 Categorizing ${contracts.length} contracts...`);

    for (const contract of contracts) {
      let category = null;

      // First check if this is a known contract from config
      if (KNOWN_CONTRACTS.farcaster.includes(contract.address.toLowerCase())) {
        category = 'farcaster';
      } else if (KNOWN_CONTRACTS.baseApp.includes(contract.address.toLowerCase())) {
        category = 'baseApp';
      } else if (KNOWN_CONTRACTS.baseBuilder.includes(contract.address.toLowerCase())) {
        category = 'baseBuilder';
      } else {
        // If not known, try pattern matching
        category = this.identifyContractCategory(contract);
      }

      if (category) {
        this.foundContracts[category].add(contract.address);
        console.log(`✅ ${contract.address} -> ${category.toUpperCase()}`);
        console.log(`   Name: ${contract.name || 'Unknown'}`);
        console.log(`   Symbol: ${contract.symbol || 'Unknown'}`);
        console.log(`   TXs: ${contract.transactionCount}`);
        console.log('');
      }
    }

    console.log('📈 Categorization Summary:');
    console.log(`   Farcaster: ${this.foundContracts.farcaster.size} contracts`);
    console.log(`   Base App: ${this.foundContracts.baseApp.size} contracts`);
    console.log(`   Base Builder: ${this.foundContracts.baseBuilder.size} contracts`);
    console.log(`   Total: ${this.foundContracts.farcaster.size + this.foundContracts.baseApp.size + this.foundContracts.baseBuilder.size} contracts`);
  }

  identifyContractCategory(contract) {
    const text = `${contract.name} ${contract.symbol} ${contract.address}`.toLowerCase();

    // Check each category
    for (const [category, config] of Object.entries(CONTRACT_PATTERNS)) {
      for (const pattern of config.patterns) {
        if (pattern.test(text)) {
          return category;
        }
      }
    }

    // If no pattern matches but has reward events, classify as baseBuilder
    if (contract.hasRewardEvents && contract.transactionCount > 10) {
      return 'baseBuilder';
    }

    return null;
  }

  async updateConfig() {
    console.log('\n💾 Updating configuration...');

    try {
      // Read current config
      let configContent = fs.readFileSync(CONFIG_PATH, 'utf8');

      // Prepare new contract lists
      const newFarcaster = [...KNOWN_CONTRACTS.farcaster, ...Array.from(this.foundContracts.farcaster)];
      const newBaseApp = [...KNOWN_CONTRACTS.baseApp, ...Array.from(this.foundContracts.baseApp)];
      const newBaseBuilder = [...KNOWN_CONTRACTS.baseBuilder, ...Array.from(this.foundContracts.baseBuilder)];

      // Update FARCASTER_CONTRACTS
      const farcasterMatch = configContent.match(/FARCASTER_CONTRACTS:\s*\[[\s\S]*?\]/);
      if (farcasterMatch) {
        const farcasterReplacement = `FARCASTER_CONTRACTS: [\n${newFarcaster.map(addr => `    '${addr}'`).join(',\n')}\n  ]`;
        configContent = configContent.replace(farcasterMatch[0], farcasterReplacement);
      }

      // Update BASE_APP_CONTRACTS
      const baseAppMatch = configContent.match(/BASE_APP_CONTRACTS:\s*\[[\s\S]*?\]/);
      if (baseAppMatch) {
        const baseAppReplacement = `BASE_APP_CONTRACTS: [\n${newBaseApp.map(addr => `    '${addr}'`).join(',\n')}\n  ]`;
        configContent = configContent.replace(baseAppMatch[0], baseAppReplacement);
      }

      // For Base Builder contracts, automatically update REWARD_CONTRACTS environment variable
      if (newBaseBuilder.length > 0) {
        console.log(`🔄 Automatically adding ${newBaseBuilder.length} Base Builder contracts to REWARD_CONTRACTS...`);

        // Read current REWARD_CONTRACTS from environment
        const currentRewardContracts = (process.env.REWARD_CONTRACTS || '').split(',').filter(addr => addr.trim());
        const updatedRewardContracts = [...new Set([...currentRewardContracts, ...newBaseBuilder])];

        // Only update if there are actually new contracts
        if (updatedRewardContracts.length > currentRewardContracts.length) {
          // Update the environment variable for current session
          process.env.REWARD_CONTRACTS = updatedRewardContracts.join(',');

          // Add a comment in config for documentation (only if not already present)
          const builderComment = `
// Auto-updated REWARD_CONTRACTS with new Base Builder contracts:
// Added: ${newBaseBuilder.join(', ')}
// Total: ${updatedRewardContracts.join(', ')}
`;
          if (!configContent.includes('Auto-updated REWARD_CONTRACTS with new Base Builder contracts')) {
            configContent += builderComment;
          }

          console.log(`✅ Added ${newBaseBuilder.length} contracts to REWARD_CONTRACTS: [${newBaseBuilder.join(', ')}]`);
          console.log(`📊 Total REWARD_CONTRACTS now: ${updatedRewardContracts.length} contracts`);
        } else {
          console.log(`ℹ️ All Base Builder contracts already in REWARD_CONTRACTS`);
        }
      }

      // Write updated config
      fs.writeFileSync(CONFIG_PATH, configContent, 'utf8');
      console.log('✅ Configuration updated successfully!');
      console.log(`📝 Added ${this.foundContracts.farcaster.size} Farcaster contracts`);
      console.log(`📝 Added ${this.foundContracts.baseApp.size} Base App contracts`);
      console.log(`📝 Added ${this.foundContracts.baseBuilder.size} Base Builder contracts to REWARD_CONTRACTS`);

    } catch (error) {
      console.error('❌ Error updating configuration:', error.message);
      throw error;
    }
  }
}

// Main execution
async function main() {
  console.log('🚀 Base Ecosystem Contract Scanner');
  console.log('==================================\n');

  console.log('🔧 Configuration:');
  console.log(`   RPC: ${BASE_RPC}`);
  console.log(`   Scan Blocks: ${SCAN_BLOCKS}`);
  console.log(`   Config Path: ${CONFIG_PATH}`);
  console.log('');

  const scanner = new ContractScanner();

  try {
    await scanner.scanForContracts();
    console.log('\n🎉 Contract scanning completed successfully!');
  } catch (error) {
    console.error('\n❌ Contract scanning failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
console.log('🔍 Debug info:');
console.log('   import.meta.url:', import.meta.url);
console.log('   process.argv[1]:', process.argv[1]);
console.log('   file:// URL:', `file://${process.argv[1]}`);

main();

export { ContractScanner };