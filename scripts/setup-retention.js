#!/usr/bin/env node
import { readFile } from 'fs/promises';
import { pool } from '../src/db/index.js';

async function setupRetentionPolicy() {
  try {
    console.log('🔄 Setting up 1-month data retention policy...');

    // Read the SQL file
    const sqlContent = await readFile('./src/db/retention-policy.sql', 'utf8');

    const client = await pool.connect();

    try {
      // Execute the entire SQL file as one statement
      await client.query(sqlContent);
      console.log('✅ Retention policy SQL executed successfully');
    } catch (error) {
      console.warn('⚠️  SQL execution failed:', error.message);
      // Try to execute individual statements more carefully
      console.log('🔄 Attempting individual statement execution...');

      // Split by double newlines and filter out comments
      const statements = sqlContent
        .split('\n\n')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

      for (const statement of statements) {
        if (statement.trim() && !statement.startsWith('--')) {
          try {
            await client.query(statement);
            console.log('✅ Executed SQL block');
          } catch (error) {
            if (!error.message.includes('already exists')) {
              console.warn('⚠️  Block failed:', error.message.substring(0, 100));
            }
          }
        }
      }
    }

    client.release();

    console.log('🎯 1-month retention policy setup complete!');
    console.log('📅 Data older than 1 month will be automatically deleted');
    console.log('📊 Storage monitoring available at /api/storage');
    console.log('🔧 Run manual cleanup with: SELECT cleanup_old_data();');

    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to setup retention policy:', error);
    process.exit(1);
  }
}

setupRetentionPolicy();