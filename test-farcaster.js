import { pool } from './src/db/index.js';

async function checkFarcasterData() {
  const client = await pool.connect();
  try {
    // Check total transactions
    const totalRes = await client.query('SELECT COUNT(*) as total FROM reward_events');
    console.log('Total transactions:', totalRes.rows[0].total);

    // Check Farcaster-related transactions
    const farcasterRes = await client.query('SELECT COUNT(*) as farcaster FROM reward_events WHERE farcaster_related = true');
    console.log('Farcaster-related transactions:', farcasterRes.rows[0].farcaster);

    // Check Base Rewards contract transactions
    const rewardsRes = await client.query(`
      SELECT contract_address, COUNT(*) as count
      FROM reward_events
      WHERE contract_address = '0x4c79b8c9cb0bd62b047880603a9b0c734f1ff0fcf'
      GROUP BY contract_address
    `);
    console.log('Base Rewards contract transactions:', rewardsRes.rows);

    // Check recent Farcaster transactions
    const recentRes = await client.query(`
      SELECT contract_address, decoded_data, farcaster_related, farcaster_metadata
      FROM reward_events
      WHERE farcaster_related = true
      ORDER BY block_timestamp DESC
      LIMIT 5
    `);
    console.log('Recent Farcaster transactions:', recentRes.rows);

  } finally {
    await client.release();
    await pool.end();
  }
}

checkFarcasterData().catch(console.error);