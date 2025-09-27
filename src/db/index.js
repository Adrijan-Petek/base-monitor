import pg from 'pg';
import dotenv from 'dotenv';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();
const { Pool } = pg;

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/base_monitor';

export const pool = new Pool({ connectionString: DATABASE_URL });

export async function initDb() {
  try {
    const currentFilePath = fileURLToPath(import.meta.url);
    const currentDir = path.dirname(currentFilePath);
    const schemaPath = path.resolve(currentDir, 'schema.sql');
    const content = await readFile(schemaPath, 'utf8');
    await pool.query(content);
    console.log('Database schema ensured.');
  } catch (e) {
    console.error('Could not initialize DB schema:', e.message);
    throw e;
  }
}
