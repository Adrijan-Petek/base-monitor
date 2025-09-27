#!/usr/bin/env node
import fetch from 'node-fetch';
import { CONFIG } from '../config.js';
import { pool, initDb } from '../db/index.js';

async function storeCast(cast) {
  const client = await pool.connect();
  try {
    await client.query(
      `INSERT INTO farcaster_casts(id, body, author, timestamp)
       VALUES($1,$2,$3,to_timestamp($4))
       ON CONFLICT (id) DO NOTHING`,
      [cast.id, cast, cast.fid || null, cast.ts || Math.floor(Date.now()/1000)]
    );
  } finally {
    client.release();
  }
}

export async function fetchCasts() {
  const url = CONFIG.FARCASTER_API_URL;
  console.log('Fetching Farcaster casts from', url);
  const res = await fetch(url);
  if (!res.ok) throw new Error('Farcaster fetch failed: ' + res.status);
  const data = await res.json();
  let arr = [];
  if (Array.isArray(data)) arr = data;
  else if (data.casts) arr = data.casts;
  else if (data.result) arr = data.result;
  for (const c of arr) await storeCast(c);
  return arr.length;
}

async function main() {
  await initDb();
  const count = await fetchCasts();
  console.log('Stored casts:', count);
  await pool.end();
}

if (process.argv[1].endsWith('farcasterCollector.js')) {
  main().catch(err=>{ console.error(err); process.exit(1);});
}
