#!/usr/bin/env node
import { pool } from '../src/db/index.js';

async function runCleanup() {
  try {
    console.log('🧹 Running manual data cleanup...');

    const client = await pool.connect();
    const result = await client.query('SELECT cleanup_old_data()');
    client.release();

    console.log('✅ Cleanup completed successfully');
    console.log('📊 Check database logs for deletion counts');

    process.exit(0);
  } catch (error) {
    console.error('❌ Cleanup failed:', error);
    process.exit(1);
  }
}

runCleanup();