import { pool } from './src/db/index.js';

async function analyzeRewardPatterns() {
  const client = await pool.connect();
  try {
    // Check for contracts distributing to many recipients (potential reward systems)
    const rewardContracts = await client.query(`
      SELECT
        contract_address,
        COUNT(DISTINCT decoded_data->>'to') as unique_recipients,
        COUNT(*) as total_transfers,
        ROUND(AVG(CAST(decoded_data->>'amount' AS DECIMAL) / 1000000000000000000), 4) as avg_amount_eth
      FROM reward_events
      WHERE decoded_data IS NOT NULL
      AND block_timestamp >= now() - '24 hours'::interval
      GROUP BY contract_address
      HAVING COUNT(DISTINCT decoded_data->>'to') > 5
      ORDER BY total_transfers DESC
      LIMIT 10
    `);

    console.log('Potential reward distribution contracts:');
    rewardContracts.rows.forEach(row => {
      console.log(`${row.contract_address}: ${row.total_transfers} transfers to ${row.unique_recipients} recipients, avg ${row.avg_amount_eth} ETH`);
    });

    // Check if Base Rewards contract exists in our data
    const baseRewards = await client.query(`
      SELECT COUNT(*) as count
      FROM reward_events
      WHERE contract_address = '0x4c79b8c9cb0bd62b047880603a9b0c734f1ff0fcf'
    `);

    console.log(`\nBase Rewards contract (0x4c79b8c9cb0bd62b047880603a9b0c734f1ff0fcf) transactions: ${baseRewards.rows[0].count}`);

    // Check for patterns that might indicate Farcaster activity
    const largeDistributions = await client.query(`
      SELECT
        contract_address,
        COUNT(*) as transfers_in_block,
        COUNT(DISTINCT decoded_data->>'to') as recipients_in_block
      FROM reward_events
      WHERE decoded_data IS NOT NULL
      AND block_timestamp >= now() - '24 hours'::interval
      GROUP BY contract_address, DATE_TRUNC('hour', block_timestamp)
      HAVING COUNT(*) > 20 AND COUNT(DISTINCT decoded_data->>'to') > 10
      ORDER BY transfers_in_block DESC
      LIMIT 5
    `);

    console.log('\nLarge distribution events (potential Farcaster rewards):');
    largeDistributions.rows.forEach(row => {
      console.log(`${row.contract_address}: ${row.transfers_in_block} transfers to ${row.recipients_in_block} recipients in one hour`);
    });

  } finally {
    await client.release();
    await pool.end();
  }
}

analyzeRewardPatterns().catch(console.error);