#!/usr/bin/env node
import { pool } from '../src/db/index.js';

async function seed() {
  const client = await pool.connect();
  try {
    await client.query(`INSERT INTO reward_events(block_number, tx_hash, log_index, contract_address, topics, data, block_timestamp) VALUES
      (100, '0xabc', 0, '0xToken', '["0xddf252ad"]', '0x0000000000000000000000000000000000000000000000000000000005f5e100', to_timestamp(extract(epoch from now())))`);
    console.log('seeded');
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(e=>{ console.error(e); process.exit(1); });
