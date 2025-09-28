#!/usr/bin/env node
import process from 'process';
import { collectLatest as baseCollect } from './collectors/baseCollector.js';
import { fetchCasts as farcasterFetch } from './collectors/farcasterCollector.js';
import { analyze } from './analyzer/analyze.js';
import fs from 'fs';
import path from 'path';

const cmd = process.argv[2] || 'help';

async function run() {
  if (cmd === 'collect-base') {
    await baseCollect();
    process.exit(0);
  } else if (cmd === 'collect-farcaster') {
    await farcasterFetch();
    process.exit(0);
  } else if (cmd === 'analyze') {
    const result = await analyze();
    
    // Store analysis results to JSON file for Vercel API to read
    const outputPath = path.join(process.cwd(), 'api', 'analysis-data.json');
    fs.writeFileSync(outputPath, JSON.stringify({
      dataSource: "database",
      ...result
    }, null, 2));
    console.log('Analysis results written to api/analysis-data.json');
    
    process.exit(0);
  } else {
    console.log('Usage: node src/cli.js [collect-base | collect-farcaster | analyze]');
    process.exit(0);
  }
}

run();
