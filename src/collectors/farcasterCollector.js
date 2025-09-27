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
  // Check if we should skip Farcaster collection
  if (process.env.SKIP_FARCASTER === 'true') {
    console.log('⏭️  Skipping Farcaster collection (SKIP_FARCASTER=true)');
    return 0;
  }

  // Try multiple approaches for Farcaster data
  const endpoints = [
    // Neynar casts/recent (requires paid plan - 402 error)
    process.env.NEYNAR_API_KEY ? {
      url: 'https://api.neynar.com/v2/farcaster/casts/recent?limit=50',
      headers: {
        'x-api-key': process.env.NEYNAR_API_KEY,
        'x-neynar-experimental': 'false'
      }
    } : null,
    // Alternative: Neynar feed (might have different pricing)
    process.env.NEYNAR_API_KEY ? {
      url: 'https://api.neynar.com/v2/farcaster/feed?feed_type=filter&filter_type=fids&fids=1&limit=50',
      headers: {
        'x-api-key': process.env.NEYNAR_API_KEY,
        'x-neynar-experimental': 'false'
      }
    } : null,
    // Free alternative: Direct Farcaster Hub (if accessible)
    {
      url: 'https://nemes.farcaster.xyz:2281/v1/castsByParent?fid=1&limit=50',
      headers: {}
    },
    // Another hub
    {
      url: 'https://api.farcaster.xyz/v2/casts/recent?limit=50',
      headers: {}
    },
    // Public Farcaster Hub API (if available)
    {
      url: 'https://hub.farcaster.standardcrypto.vc:2281/v1/castsByParent?fid=1&limit=100',
      headers: {}
    },
    // Alternative public endpoints
    {
      url: 'https://api.farcaster.xyz/v2/casts/recent?limit=100',
      headers: {}
    },
    {
      url: 'https://api.farcaster.xyz/v1/casts/recent?limit=100',
      headers: {}
    }
  ].filter(endpoint => endpoint !== null); // Remove null entries if no API key

  for (const endpoint of endpoints) {
    try {
      const url = endpoint.url;
      const customHeaders = endpoint.headers || {};

      console.log('Trying Farcaster endpoint:', url.replace(/api_key=[^&]+/, 'api_key=***'));

      const headers = {
        'Content-Type': 'application/json',
        'User-Agent': 'Base-Monitor/1.0',
        ...customHeaders // Add custom headers (like API key)
      };

      const res = await fetch(url, {
        headers,
        timeout: 15000 // Increased timeout
      });

      if (!res.ok) {
        console.log(`Endpoint ${url.replace(/api_key=[^&]+/, 'api_key=***')} returned ${res.status}, trying next...`);
        continue;
      }

      const data = await res.json();
      let arr = [];

      // Handle different response formats
      if (Array.isArray(data)) arr = data;
      else if (data.casts) arr = data.casts;
      else if (data.result && Array.isArray(data.result)) arr = data.result;
      else if (data.result && data.result.casts) arr = data.result.casts;
      else if (data.data) arr = data.data;
      // Neynar API specific format
      else if (data.result && data.result.casts) arr = data.result.casts;

      if (arr.length === 0) {
        console.log(`No casts found in response from ${url.replace(/api_key=[^&]+/, 'api_key=***')}, trying next...`);
        continue;
      }

      console.log(`✅ Successfully fetched ${arr.length} Farcaster casts from ${url.replace(/api_key=[^&]+/, 'api_key=***')}`);

      // Store casts (limit to prevent overwhelming the database)
      let stored = 0;
      for (const c of arr.slice(0, 50)) {
        try {
          await storeCast(c);
          stored++;
        } catch (storeError) {
          console.warn('Failed to store cast:', storeError.message);
        }
      }

      console.log(`📦 Stored ${stored} casts in database`);
      return stored; // Success, return count

    } catch (e) {
      console.log(`Endpoint ${endpoint.url} failed:`, e.message);
      continue;
    }
  }

  console.log('❌ All Farcaster endpoints failed. Consider getting a Neynar API key for reliable access.');
  console.log('💡 Get your API key at: https://neynar.com/');
  return 0;
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
