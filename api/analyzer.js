#!/usr/bin/env node

// Completely self-contained analyzer - no external imports
import https from 'https';
import http from 'http';

// Inline database connection using built-in modules
async function createDatabaseConnection() {
  try {
    const { Client } = await import('pg');
    const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/base_monitor';
    const client = new Client({
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });
    return client;
  } catch (e) {
    console.log('Database module not available, using mock data');
    return null; // Return null to indicate database is not available
  }
}

// Inline ethers functionality (simplified for our needs)
function createProvider(rpcUrl) {
  // Simplified provider for basic JSON-RPC calls
  return {
    async call(method, params = []) {
      return new Promise((resolve, reject) => {
        const postData = JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method,
          params
        });

        const url = new URL(rpcUrl);
        const options = {
          hostname: url.hostname,
          port: url.port,
          path: url.pathname,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
          }
        };

        const req = https.request(options, (res) => {
          let data = '';
          res.on('data', (chunk) => data += chunk);
          res.on('end', () => {
            try {
              const result = JSON.parse(data);
              resolve(result.result);
            } catch (e) {
              reject(e);
            }
          });
        });

        req.on('error', reject);
        req.write(postData);
        req.end();
      });
    }
  };
}

// Inline formatEther function (converts wei to ether)
function formatEther(wei) {
  const weiStr = wei.toString();
  const len = weiStr.length;
  if (len <= 18) {
    return '0.' + '0'.repeat(18 - len) + weiStr;
  }
  return weiStr.slice(0, len - 18) + '.' + weiStr.slice(len - 18);
}

// Inline configuration
const CONFIG = {
  BASE_RPC: process.env.BASE_RPC || 'https://mainnet.base.org',
  FARCASTER_API_URL: process.env.FARCASTER_API_URL || 'https://api.warpcast.com/v2/recent-casts',
  NEYNAR_API_KEY: process.env.NEYNAR_API_KEY,
  NUM_BLOCKS: parseInt(process.env.NUM_BLOCKS || '100', 10),
  START_BLOCK: parseInt(process.env.START_BLOCK || '0', 10),
  ALERT_TOP_SHARE: parseFloat(process.env.ALERT_TOP_SHARE || '0.5'),
  ALERT_WINDOW_HOURS: parseInt(process.env.ALERT_WINDOW_HOURS || '24', 10),
  REWARD_CONTRACTS: (process.env.REWARD_CONTRACTS || '').split(',').filter(addr => addr.trim()),
  FARCASTER_CONTRACTS: [
    '0x4c79b8c9cB0BD62B047880603a9B0c734f1FF0FcF',
    '0x1fc10ef15e041c5d3c54042e52eb0c54cb9b710c',
    '0x8dc80a209a3362f0586e6c116973bb6908170c84',
    '0x6921b130d297cc43754afba22e5eac0fbf8db75b',
    '0xd15fE25eD0Dba12fE05e7029C88b10C25e8880E3',
    '0x4c79b8c9cB0BD62B047880603a9B0c734f1FF0FcF',
    '0x1fc10ef15e041c5d3c54042e52eb0c54cb9b710c',
    '0x8dc80a209a3362f0586e6c116973bb6908170c84',
    '0x6921b130d297cc43754afba22e5eac0fbf8db75b',
    '0xd15fE25eD0Dba12fE05e7029C88b10C25e8880E3'
  ],
  BASE_APP_CONTRACTS: [
    '0x1986cc18d8ec757447254310d2604f85741aa732',
    '0x1986cc18d8ec757447254310d2604f85741aa732'
  ],
  FARCASTER_ADDRESSES: [],
  ENABLE_FARCASTER_BLOCKCHAIN_DETECTION: process.env.ENABLE_FARCASTER_BLOCKCHAIN_DETECTION !== 'false'
};

// Inline gini function
function gini(arr) {
  if (arr.length === 0) return 0;
  const sorted = arr.slice().sort((a, b) => a - b);
  let sum = 0;
  for (let i = 0; i < sorted.length; i++) {
    sum += sorted[i] * (i + 1);
  }
  const total = sorted.reduce((a, b) => a + b, 0);
  if (total === 0) return 0;
  return 1 - (2 * sum) / (arr.length * total);
}

async function initDb() {
  const client = await createDatabaseConnection();
  if (!client) {
    console.log('Database not available, skipping initialization');
    return false;
  }
  try {
    await client.connect();
    await client.query('SELECT 1');
    console.log('Database connection established.');
    return true;
  } catch (e) {
    console.error('Could not connect to database:', e.message);
    return false;
  } finally {
    await client.end();
  }
}

async function loadRecentTransfers(hours = CONFIG.ALERT_WINDOW_HOURS) {
  const client = await createDatabaseConnection();
  if (!client) {
    console.log('Database not available, returning empty transfers');
    return [];
  }
  try {
    await client.connect();
    const res = await client.query(
      `SELECT * FROM reward_events
       WHERE block_timestamp >= now() - ($1 || ' hours')::interval
       AND decoded_data IS NOT NULL`,
      [hours]
    );
    return res.rows;
  } finally {
    await client.end();
  }
}

async function analyzeBaseBlockchain() {
  console.log('\n' + '='.repeat(50));
  console.log('🏛️  BASE BLOCKCHAIN REWARD ANALYSIS');
  console.log('='.repeat(50));

  const transfers = await loadRecentTransfers();
  if (transfers.length === 0) {
    console.log('No ERC20 Transfer logs in window.');
    return {
      gini: 0,
      top10Share: 0,
      uniqueRecipients: 0,
      manipulationScore: 0,
      topRecipients: [],
      totalTransfers: 0,
      totalVolume: '0'
    };
  }

  const totals = {};
  let totalVolume = 0n;

  for (const event of transfers) {
    if (event.decoded_data) {
      const decoded = event.decoded_data;
      if (decoded && decoded.to && decoded.amount) {
        const to = decoded.to.toLowerCase();
        const amount = BigInt(decoded.amount);
        totals[to] = (totals[to] || 0n) + amount;
        totalVolume += amount;
      }
    }
  }

  if (Object.keys(totals).length === 0) {
    console.log('No valid transfer data found.');
    return {
      gini: 0,
      top10Share: 0,
      uniqueRecipients: 0,
      manipulationScore: 0,
      topRecipients: [],
      totalTransfers: 0,
      totalVolume: '0'
    };
  }

  const amounts = Object.values(totals).map(x => Number(x));
  const g = gini(amounts);
  const sorted = Object.entries(totals).sort((a, b) => Number(b[1] - a[1]));

  const topCount = Math.max(1, Math.floor(sorted.length * 0.1));
  const topSum = sorted.slice(0, topCount).reduce((s, c) => s + BigInt(c[1]), 0n);
  const topShare = Number(topSum) / Number(totalVolume);

  console.log('Time window:', CONFIG.ALERT_WINDOW_HOURS, 'hours');
  console.log('Total transfers analyzed:', transfers.length);
  console.log('Unique recipients:', Object.keys(totals).length);
  console.log('Total volume distributed:', formatEther(totalVolume), 'tokens');
  console.log('Gini coefficient:', g.toFixed(4), '(0 = perfect equality, 1 = max inequality)');
  console.log('Top 10% recipients share:', (topShare * 100).toFixed(2) + '%');

  if (g > 0.8) {
    console.log('🚨 ALERT: Extremely high inequality detected! Possible manipulation.');
  } else if (g > 0.6) {
    console.log('⚠️  WARNING: High inequality detected.');
  } else {
    console.log('✅ Distribution looks fair.');
  }

  if (topShare >= CONFIG.ALERT_TOP_SHARE) {
    console.log('🚨 ALERT: Top recipients control', (topShare * 100).toFixed(2) + '% of rewards!');
  }

  const topRecipientsCount = Math.min(100, sorted.length);
  console.log(`\nTop ${topRecipientsCount} Recipients:`);
  const topRecipients = sorted.slice(0, topRecipientsCount).map(([address, amount], i) => {
    const percentage = (Number(amount) / Number(totalVolume) * 100).toFixed(4);
    const rank = (i + 1).toString().padStart(3, ' ');
    console.log(`${rank}. ${address}: ${formatEther(amount)} tokens (${percentage}%)`);
    return {
      address: address,
      amount: formatEther(amount),
      percentage: parseFloat(percentage)
    };
  });

  const top1Percent = Math.max(1, Math.floor(sorted.length * 0.01));
  const top1Sum = sorted.slice(0, top1Percent).reduce((s, c) => s + BigInt(c[1]), 0n);
  const top1Share = Number(top1Sum) / Number(totalVolume);

  const top5Percent = Math.max(1, Math.floor(sorted.length * 0.05));
  const top5Sum = sorted.slice(0, top5Percent).reduce((s, c) => s + BigInt(c[1]), 0n);
  const top5Share = Number(top5Sum) / Number(totalVolume);

  console.log('\nDetailed Distribution Analysis:');
  console.log('Top 1% of recipients control:', (top1Share * 100).toFixed(2) + '% of rewards');
  console.log('Top 5% of recipients control:', (top5Share * 100).toFixed(2) + '% of rewards');
  console.log('Top 10% of recipients control:', (topShare * 100).toFixed(2) + '% of rewards');

  const concentrationRatio = Number(sorted[0][1]) / Number(totalVolume);
  console.log('Largest single recipient:', (concentrationRatio * 100).toFixed(2) + '% of total rewards');

  let manipulationScore = 0;
  let manipulationReasons = [];

  if (g > 0.95) {
    manipulationScore += 3;
    manipulationReasons.push('Extreme Gini coefficient (>0.95)');
  } else if (g > 0.85) {
    manipulationScore += 2;
    manipulationReasons.push('Very high Gini coefficient (>0.85)');
  } else if (g > 0.75) {
    manipulationScore += 1;
    manipulationReasons.push('High Gini coefficient (>0.75)');
  }

  if (top1Share > 0.5) {
    manipulationScore += 3;
    manipulationReasons.push('Top 1% controls >50% of rewards');
  } else if (top1Share > 0.3) {
    manipulationScore += 2;
    manipulationReasons.push('Top 1% controls >30% of rewards');
  } else if (top1Share > 0.2) {
    manipulationScore += 1;
    manipulationReasons.push('Top 1% controls >20% of rewards');
  }

  if (concentrationRatio > 0.1) {
    manipulationScore += 2;
    manipulationReasons.push('Single recipient controls >10% of rewards');
  } else if (concentrationRatio > 0.05) {
    manipulationScore += 1;
    manipulationReasons.push('Single recipient controls >5% of rewards');
  }

  console.log('\n=== MANIPULATION RISK ASSESSMENT ===');
  if (manipulationScore >= 5) {
    console.log('🚨 CRITICAL: High risk of reward manipulation detected!');
  } else if (manipulationScore >= 3) {
    console.log('⚠️  WARNING: Moderate risk of manipulation detected.');
  } else if (manipulationScore >= 1) {
    console.log('ℹ️  NOTICE: Some inequality detected, monitor closely.');
  } else {
    console.log('✅ Distribution appears fair and decentralized.');
  }

  if (manipulationReasons.length > 0) {
    console.log('Reasons for concern:');
    manipulationReasons.forEach(reason => console.log(`  • ${reason}`));
  }

  console.log('Manipulation risk score:', manipulationScore, '/ 8');

    return {
      gini: g,
      top10Share: topShare,
      uniqueRecipients: Object.keys(totals).length,
      manipulationScore: manipulationScore,
      topRecipients: topRecipients,
      totalTransfers: transfers.length,
      totalVolume: formatEther(totalVolume),
      manipulationReasons: manipulationReasons
    };
}

async function analyzeFarcasterRewards() {
  console.log('\n' + '='.repeat(50));
  console.log('🗣️  FARCASTER REWARD ANALYSIS');
  console.log('='.repeat(50));

  const client = await createDatabaseConnection();
  if (!client) {
    console.log('❌ Database not available. Returning mock Farcaster data.');
    return {
      totalCasts: 0,
      uniqueAuthors: 0,
      top10Share: 0,
      manipulationScore: 0,
      topAuthors: []
    };
  }

  try {
    await client.connect();
    const res = await client.query(
      `SELECT * FROM farcaster_casts
       WHERE timestamp >= now() - ($1 || ' hours')::interval
       ORDER BY timestamp DESC`,
      [CONFIG.ALERT_WINDOW_HOURS]
    );

    const casts = res.rows;
    console.log('Time window:', CONFIG.ALERT_WINDOW_HOURS, 'hours');
    console.log('Total casts analyzed:', casts.length);

    if (casts.length === 0) {
      console.log('❌ No Farcaster data available. API integration needed.');
      console.log('💡 Farcaster APIs moved to Snapchain. Consider using Neynar API.');
      return {
        totalCasts: 0,
        uniqueAuthors: 0,
        top10Share: 0,
        manipulationScore: 0,
        topAuthors: []
      };
    }

    const authorStats = {};
    casts.forEach(cast => {
      const author = cast.author || 'unknown';
      authorStats[author] = (authorStats[author] || 0) + 1;
    });

    const sortedAuthors = Object.entries(authorStats).sort((a, b) => b[1] - a[1]);
    const totalCasts = casts.length;

    console.log('Unique authors:', Object.keys(authorStats).length);
    console.log('Average casts per author:', (totalCasts / Object.keys(authorStats).length).toFixed(2));

    console.log('\nTop 10 Most Active Authors:');
    const topAuthors = sortedAuthors.slice(0, 10).map(([author, count], i) => {
      const percentage = (count / totalCasts * 100).toFixed(2);
      console.log(`${i+1}. ${author}: ${count} casts (${percentage}%)`);
      return {
        author: author,
        casts: count,
        percentage: parseFloat(percentage)
      };
    });

    const top10Percent = Math.max(1, Math.floor(sortedAuthors.length * 0.1));
    const top10Sum = sortedAuthors.slice(0, top10Percent).reduce((s, c) => s + c[1], 0);
    const top10Share = top10Sum / totalCasts;

    console.log('\nActivity Concentration:');
    console.log('Top 10% of authors produce:', (top10Share * 100).toFixed(2) + '% of casts');

    let manipulationScore = 0;
    if (top10Share > 0.5) {
      manipulationScore = 2;
      console.log('⚠️  WARNING: High concentration of activity among few authors');
    } else if (top10Share > 0.3) {
      manipulationScore = 1;
      console.log('ℹ️  NOTICE: Moderate concentration of activity');
    } else {
      console.log('✅ Activity appears well distributed');
    }

    return {
      totalCasts: totalCasts,
      uniqueAuthors: Object.keys(authorStats).length,
      top10Share: top10Share,
      manipulationScore: manipulationScore,
      topAuthors: topAuthors
    };

  } finally {
    await client.end();
  }
}

async function analyzeBaseAppRewards() {
  console.log('\n' + '='.repeat(50));
  console.log('📱 BASE APP REWARD ANALYSIS');
  console.log('='.repeat(50));

  console.log('Time window:', CONFIG.ALERT_WINDOW_HOURS, 'hours');
  console.log('❌ Base App reward APIs not yet implemented');
  console.log('💡 Need to discover Base App leaderboard/reward endpoints');
  console.log('🔍 Look for Base App API documentation or reverse-engineer app requests');

  console.log('\nPlanned analysis will include:');
  console.log('• User reward distributions');
  console.log('• Mini-app engagement rewards');
  console.log('• Trading activity rewards');
  console.log('• Social interaction rewards');
}

async function analyzeBaseBuilderRewards() {
  console.log('\n' + '='.repeat(50));
  console.log('🔨 BASE BUILDER REWARD ANALYSIS');
  console.log('='.repeat(50));

  console.log('Time window:', CONFIG.ALERT_WINDOW_HOURS, 'hours');
  console.log('❌ Base Builder reward APIs not yet implemented');
  console.log('💡 Need to discover Base Builder reward distribution systems');
  console.log('🔍 Check Base documentation for builder incentive programs');

  console.log('\nPlanned analysis will include:');
  console.log('• Builder grant distributions');
  console.log('• Hackathon reward allocations');
  console.log('• Ecosystem fund distributions');
  console.log('• Developer incentive programs');
}

async function runAnalysis() {
  console.log('🔍 Starting comprehensive reward manipulation analysis...');
  console.log('Analysis timestamp:', new Date().toISOString());

  try {
    await initDb();

    const baseBlockchain = await analyzeBaseBlockchain();
    const farcaster = await analyzeFarcasterRewards();
    await analyzeBaseAppRewards();
    await analyzeBaseBuilderRewards();

    console.log('\n' + '='.repeat(50));
    console.log('✅ Analysis complete for all platforms');
    console.log('='.repeat(50));

    return {
      baseBlockchain,
      farcaster,
      baseApp: { status: 'not_implemented' },
      baseBuilder: { status: 'not_implemented' },
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error('❌ Analysis failed:', error);
    throw error;
  }
  // Don't close pool in serverless environment
}

async function analyze() {
  return await runAnalysis();
}

export { analyze, runAnalysis };

if (process.argv[1] && process.argv[1].endsWith('analyze.js')) {
  analyze().catch(e=>{ console.error(e); process.exit(1); });
}
