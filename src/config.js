import dotenv from 'dotenv';
dotenv.config();

export const CONFIG = {
  BASE_RPC: process.env.BASE_RPC || 'https://mainnet.base.org',
  FARCASTER_API_URL: process.env.FARCASTER_API_URL || 'https://api.farcaster.xyz/v2/casts',
  NUM_BLOCKS: parseInt(process.env.NUM_BLOCKS || '100', 10),
  START_BLOCK: parseInt(process.env.START_BLOCK || '0', 10),
  ALERT_TOP_SHARE: parseFloat(process.env.ALERT_TOP_SHARE || '0.5'),
  ALERT_WINDOW_HOURS: parseInt(process.env.ALERT_WINDOW_HOURS || '24', 10)
};
