#!/usr/bin/env node
import process from 'process';
import { collectLatest as baseCollect } from './collectors/baseCollector.js';
import { fetchCasts as farcasterFetch } from './collectors/farcasterCollector.js';
import { analyze } from './analyzer/analyze.js';

const cmd = process.argv[2] || 'help';

async function run() {
  if (cmd === 'collect-base') {
    await baseCollect();
    process.exit(0);
  } else if (cmd === 'collect-farcaster') {
    await farcasterFetch();
    process.exit(0);
  } else if (cmd === 'analyze') {
    await analyze();
    process.exit(0);
  } else {
    console.log('Usage: node src/cli.js [collect-base | collect-farcaster | analyze]');
    process.exit(0);
  }
}

run();
