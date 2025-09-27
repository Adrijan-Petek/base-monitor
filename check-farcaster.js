import { pool } from './src/db/index.js';

async function checkFarcasterTransactions() {
  try {
    const res = await pool.query(
      'SELECT contract_address, farcaster_metadata, decoded_data, block_timestamp FROM reward_events WHERE farcaster_related = true LIMIT 5'
    );

    console.log('Farcaster transactions detected:');
    res.rows.forEach((row, i) => {
      console.log(`${i+1}. Contract: ${row.contract_address}`);
      const metadata = row.farcaster_metadata || {};
      console.log(`   Type: ${metadata.contractType || 'unknown'}`);
      console.log(`   Amount: ${metadata.amount || 'N/A'}`);
      console.log(`   User: ${metadata.potentialFarcasterUser || 'N/A'}`);
      console.log(`   Time: ${row.block_timestamp}`);
      console.log('');
    });
  } finally {
    await pool.end();
  }
}

checkFarcasterTransactions().catch(console.error);