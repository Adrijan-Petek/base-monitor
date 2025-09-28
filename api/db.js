import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pg;

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/base_monitor';

export const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export async function initDb() {
  try {
    // Simple connection test - assume schema is already created
    await pool.query('SELECT 1');
    console.log('Database connection established.');
  } catch (e) {
    console.error('Could not connect to database:', e.message);
    throw e;
  }
}
