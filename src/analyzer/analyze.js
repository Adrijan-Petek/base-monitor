#!/usr/bin/env node
import { pool, initDb } from '../db/index.js';
import { CONFIG } from '../config.js';
import { gini } from '../utils.js';
import { ethers } from 'ethers';

async function loadRecentTransfers(hours = CONFIG.ALERT_WINDOW_HOURS) {
  const client = await pool.connect();
  try {
    const res = await client.query(
      `SELECT * FROM reward_events WHERE block_timestamp >= now() - ($1 || ' hours')::interval`,
      [hours]
    );
    return res.rows;
  } finally {
    client.release();
  }
}

function parseERC20Transfer(log) {
  try {
    const iface = new ethers.Interface(['event Transfer(address indexed from, address indexed to, uint256 value)']);
    const parsed = iface.parseLog({ topics: JSON.parse(log.topics), data: log.data });
    return { from: parsed.args[0], to: parsed.args[1], value: parsed.args[2].toString() };
  } catch (e) {
    return null;
  }
}

async function analyze() {
  await initDb();
  const logs = await loadRecentTransfers();
  const transfers = [];
  for (const l of logs) {
    const t = parseERC20Transfer(l);
    if (t) transfers.push(t);
  }
  if (transfers.length === 0) {
    console.log('No ERC20 Transfer logs in window.');
    await pool.end();
    return;
  }
  const totals = {};
  for (const t of transfers) {
    const to = t.to.toLowerCase();
    const v = BigInt(t.value);
    totals[to] = (totals[to] || 0n) + v;
  }
  const amounts = Object.values(totals).map(x=>Number(x));
  const g = gini(amounts);
  const sorted = Object.entries(totals).sort((a,b)=>Number(b[1]-a[1]));
  const topCount = Math.max(1, Math.floor(sorted.length * 0.1));
  const totalSum = Object.values(totals).reduce((a,b)=>a+b, 0n);
  const topSum = sorted.slice(0, topCount).reduce((s,c)=>s + BigInt(c[1]), 0n);
  const topShare = Number(topSum) / Number(totalSum);
  console.log('Transfers parsed:', transfers.length);
  console.log('Unique recipients:', Object.keys(totals).length);
  console.log('Gini:', g.toFixed(4));
  console.log('Top share (top 10%):', topShare.toFixed(4));
  if (topShare >= CONFIG.ALERT_TOP_SHARE) {
    console.log('ALERT: High concentration detected!');
  } else {
    console.log('Concentration looks OK.');
  }
  await pool.end();
}

if (process.argv[1].endsWith('analyze.js')) {
  analyze().catch(e=>{ console.error(e); process.exit(1); });
}
