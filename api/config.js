import dotenv from 'dotenv';
import { ethers } from 'ethers';
dotenv.config();

// Helper function to validate and clean Ethereum addresses
function cleanAddresses(addressList) {
  return addressList
    .map(addr => {
      if (!addr || typeof addr !== 'string') return null;
      const cleaned = addr.trim();
      if (!cleaned) return null;
      if (!cleaned.startsWith('0x') || (cleaned.length !== 42 && cleaned.length !== 43)) {
        console.warn(`Invalid address format in config: "${cleaned}" (length: ${cleaned.length})`);
        return null;
      }
      // Remove any extra characters at the end if it's 43 chars
      const finalAddr = cleaned.length === 43 ? cleaned.slice(0, 42) : cleaned;
      try {
        // Validate as Ethereum address
        return ethers.getAddress(finalAddr);
      } catch (e) {
        console.warn(`Invalid address checksum in config: ${finalAddr} - ${e.message}`);
        // Still include it if it's the right format, just not checksummed
        return finalAddr.toLowerCase();
      }
    })
    .filter(addr => addr !== null);
}

export const CONFIG = {
  BASE_RPC: process.env.BASE_RPC || 'https://mainnet.base.org',
  FARCASTER_API_URL: process.env.FARCASTER_API_URL || 'https://api.warpcast.com/v2/recent-casts',
  NEYNAR_API_KEY: process.env.NEYNAR_API_KEY, // Optional: For reliable Farcaster data access
  NUM_BLOCKS: parseInt(process.env.NUM_BLOCKS || '100', 10),
  START_BLOCK: parseInt(process.env.START_BLOCK || '0', 10),
  ALERT_TOP_SHARE: parseFloat(process.env.ALERT_TOP_SHARE || '0.5'),
  ALERT_WINDOW_HOURS: parseInt(process.env.ALERT_WINDOW_HOURS || '24', 10),
  REWARD_CONTRACTS: cleanAddresses((process.env.REWARD_CONTRACTS || '').split(',').filter(addr => addr.trim())),

    // Farcaster-related contracts and addresses on Base
  FARCASTER_CONTRACTS: cleanAddresses([
    '0x4c79b8c9cB0BD62B047880603a9B0c734f1FF0FcF',
    '0x1fc10ef15e041c5d3c54042e52eb0c54cb9b710c',
    '0x8dc80a209a3362f0586e6c116973bb6908170c84',
    '0x6921b130d297cc43754afba22e5eac0fbf8db75b',
    '0xd15fE25eD0Dba12fE05e7029C88b10C25e8880E3',
    '0x4c79b8c9cB0BD62B047880603a9B0c734f1FF0FcF',
    '0x1fc10ef15e041c5d3c54042e52eb0c54cb9b710c',
    '0x8dc80a209a3362f0586e6c116973bb6908170c84',
    '0x6921b130d297cc43754afba22e5eac0fbf8db75b',
    '0xd15fE25eD0Dba12fE05e7029C88b10C25e8880E3'
  ]),

  // Base App specific contracts
  BASE_APP_CONTRACTS: cleanAddresses([
    '0x1986cc18d8ec757447254310d2604f85741aa732',
    '0x1986cc18d8ec757447254310d2604f85741aa732'
  ]),

  // Known Farcaster ecosystem addresses (can be expanded)
  FARCASTER_ADDRESSES: cleanAddresses([
    // Add known Farcaster-related addresses here
  ]),

  // Enable Farcaster transaction detection via blockchain
  ENABLE_FARCASTER_BLOCKCHAIN_DETECTION: process.env.ENABLE_FARCASTER_BLOCKCHAIN_DETECTION !== 'false'
};

// New Base Builder contracts found (add to REWARD_CONTRACTS if verified):
// 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913

// New Base Builder contracts found (add to REWARD_CONTRACTS if verified):
// 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913

// Auto-updated REWARD_CONTRACTS with new Base Builder contracts:
// Added: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
// Total: 0x4200000000000000000000000000000000000042, 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913, 0x1fc10ef15e041c5d3c54042e52eb0c54cb9b710c, 0x1986cc18d8ec757447254310d2604f85741aa732, 0x8dc80a209a3362f0586e6c116973bb6908170c84, 0x6921b130d297cc43754afba22e5eac0fbf8db75b
