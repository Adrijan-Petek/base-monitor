#!/usr/bin/env node
import express from 'express';
import cors from 'cors';
import { ethers } from 'ethers';
import { pool, initDb } from '../src/db/index.js';
import { CONFIG } from '../src/config.js';
import { gini } from '../src/utils.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files inline for Vercel
import fs from 'fs';
const staticFiles = {
  '/': 'public/index.html',
  '/index.html': 'public/index.html',
  '/styles.css': 'public/styles.css',
  '/app.js': 'public/app.js',
  '/favicon.svg': 'public/favicon.svg',
  '/apple-touch-icon.svg': 'public/apple-touch-icon.svg'
};

// Function to serve static files
function serveStaticFile(req, res, filePath) {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const ext = path.extname(filePath);
      let contentType = 'text/plain';
      if (ext === '.html') contentType = 'text/html';
      else if (ext === '.css') contentType = 'text/css';
      else if (ext === '.js') contentType = 'application/javascript';
      else if (ext === '.svg') contentType = 'image/svg+xml';
      res.setHeader('Content-Type', contentType);
      res.send(content);
    } else {
      res.status(404).send('File not found');
    }
  } catch (error) {
    console.error('Error serving static file:', error);
    res.status(500).send('Internal server error');
  }
}

// Lazy database initialization
let dbInitialized = false;
async function ensureDbInitialized() {
  if (!dbInitialized) {
    try {
      await initDb();
      console.log('✅ Database initialized successfully');
      dbInitialized = true;
    } catch (error) {
      console.error('❌ Database initialization failed:', error);
      throw error;
    }
  }
}

// Routes
app.get('/', (req, res) => {
  serveStaticFile(req, res, 'public/index.html');
});

// Serve other static files
Object.keys(staticFiles).forEach(route => {
  if (route !== '/') {
    app.get(route, (req, res) => {
      serveStaticFile(req, res, staticFiles[route]);
    });
  }
});

// API Routes
app.get('/api/analysis', async (req, res) => {
  try {
    await ensureDbInitialized();
    const analysis = await generateAnalysisData();
    res.json(analysis);
  } catch (error) {
    console.error('Analysis API Error:', error);
    res.status(500).json({
      error: 'Failed to generate analysis',
      timestamp: new Date().toISOString()
    });
  }
});

// Historical data endpoint for 3-month reports
app.get('/api/historical', async (req, res) => {
  try {
    await ensureDbInitialized();
    const historicalData = await generateHistoricalData();
    res.json(historicalData);
  } catch (error) {
    console.error('Historical API Error:', error);
    res.status(500).json({
      error: 'Failed to generate historical data',
      timestamp: new Date().toISOString()
    });
  }
});

// Generate comprehensive analysis data
async function generateAnalysisData() {
  const analysis = {
    timestamp: new Date().toISOString(),
    baseBlockchain: await analyzeBaseBlockchain(),
    farcaster: await analyzeFarcasterBlockchain(),
    baseBuilder: await analyzeBaseBuilder(),
    baseApp: await analyzeBaseApp()
  };

  return analysis;
}

async function analyzeBaseBlockchain() {
  const client = await pool.connect();
  try {
    const res = await client.query(
      `SELECT * FROM reward_events
       WHERE block_timestamp >= now() - ($1 || ' hours')::interval
       AND decoded_data IS NOT NULL`,
      [CONFIG.ALERT_WINDOW_HOURS]
    );

    const transfers = res.rows;
    if (transfers.length === 0) {
      return {
        totalTransfers: 0,
        uniqueRecipients: 0,
        totalVolume: '0',
        gini: 0,
        top10Share: 0,
        manipulationScore: 0,
        topRecipients: [],
        farcasterTransfers: 0,
        farcasterRecipients: 0,
        farcasterVolume: '0',
        farcasterTopRecipients: []
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
      return {
        totalTransfers: transfers.length,
        uniqueRecipients: 0,
        totalVolume: '0',
        gini: 0,
        top10Share: 0,
        manipulationScore: 0,
        topRecipients: [],
        farcasterTransfers: 0,
        farcasterRecipients: 0,
        farcasterVolume: '0',
        farcasterTopRecipients: []
      };
    }

    const amounts = Object.values(totals).map(x => Number(x));
    const g = gini(amounts);
    const sorted = Object.entries(totals).sort((a, b) => Number(b[1] - a[1]));

    const topCount = Math.max(1, Math.floor(sorted.length * 0.1));
    const topSum = sorted.slice(0, topCount).reduce((s, c) => s + BigInt(c[1]), 0n);
    const topShare = Number(topSum) / Number(totalVolume);

    const top1Percent = Math.max(1, Math.floor(sorted.length * 0.01));
    const top1Sum = sorted.slice(0, top1Percent).reduce((s, c) => s + BigInt(c[1]), 0n);
    const top1Share = Number(top1Sum) / Number(totalVolume);

    const top5Percent = Math.max(1, Math.floor(sorted.length * 0.05));
    const top5Sum = sorted.slice(0, top5Percent).reduce((s, c) => s + BigInt(c[1]), 0n);
    const top5Share = Number(top5Sum) / Number(totalVolume);

    const concentrationRatio = Number(sorted[0][1]) / Number(totalVolume);

    let manipulationScore = 0;
    if (g > 0.95) manipulationScore += 3;
    else if (g > 0.85) manipulationScore += 2;
    else if (g > 0.75) manipulationScore += 1;

    if (top1Share > 0.5) manipulationScore += 3;
    else if (top1Share > 0.3) manipulationScore += 2;
    else if (top1Share > 0.2) manipulationScore += 1;

    if (concentrationRatio > 0.1) manipulationScore += 2;
    else if (concentrationRatio > 0.05) manipulationScore += 1;

    const topRecipients = sorted.slice(0, 100).map(([address, amount], index) => ({
      rank: index + 1,
      address: address,
      amount: ethers.formatEther(amount),
      percentage: (Number(amount) / Number(totalVolume)) * 100
    }));

    // Analyze Farcaster-related transactions
    const farcasterTransfers = transfers.filter(event => event.farcaster_related);
    const farcasterTotals = {};
    let farcasterVolume = 0n;

    for (const event of farcasterTransfers) {
      if (event.decoded_data) {
        const decoded = event.decoded_data;
        if (decoded && decoded.to && decoded.amount) {
          const to = decoded.to.toLowerCase();
          const amount = BigInt(decoded.amount);
          farcasterTotals[to] = (farcasterTotals[to] || 0n) + amount;
          farcasterVolume += amount;
        }
      }
    }

    const farcasterRecipients = Object.keys(farcasterTotals).length;
    const farcasterTopRecipients = Object.entries(farcasterTotals)
      .sort((a, b) => Number(b[1] - a[1]))
      .slice(0, 50)
      .map(([address, amount], index) => ({
        rank: index + 1,
        address: address,
        amount: ethers.formatEther(amount),
        percentage: farcasterVolume > 0n ? (Number(amount) / Number(farcasterVolume)) * 100 : 0
      }));

    return {
      totalTransfers: transfers.length,
      uniqueRecipients: Object.keys(totals).length,
      totalVolume: ethers.formatEther(totalVolume),
      gini: g,
      top1Share: top1Share * 100,
      top5Share: top5Share * 100,
      top10Share: topShare * 100,
      largestRecipientShare: concentrationRatio * 100,
      manipulationScore: manipulationScore,
      riskLevel: manipulationScore >= 5 ? 'critical' : manipulationScore >= 3 ? 'warning' : 'normal',
      topRecipients: topRecipients,
      // Farcaster blockchain data
      farcasterTransfers: farcasterTransfers.length,
      farcasterRecipients: farcasterRecipients,
      farcasterVolume: ethers.formatEther(farcasterVolume),
      farcasterTopRecipients: farcasterTopRecipients
    };

  } finally {
    client.release();
  }
}

// Analyze Farcaster-related blockchain transfers
async function analyzeFarcasterBlockchain() {
  const client = await pool.connect();
  try {
    // Query only Farcaster-related contracts
    const farcasterContracts = CONFIG.FARCASTER_CONTRACTS.map(addr => addr.toLowerCase());
    const placeholders = farcasterContracts.map((_, i) => `$${i + 1}`).join(',');

    const query = `
      SELECT * FROM reward_events
      WHERE block_timestamp >= now() - ($1 || ' hours')::interval
      AND decoded_data IS NOT NULL
      AND LOWER(contract_address) = ANY($2)
    `;

    const res = await client.query(query, [CONFIG.ALERT_WINDOW_HOURS, farcasterContracts]);
    const transfers = res.rows;

    if (transfers.length === 0) {
      return {
        totalTransfers: 0,
        uniqueRecipients: 0,
        totalVolume: '0',
        topRecipients: [],
        status: 'monitoring'
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

    const sorted = Object.entries(totals).sort((a, b) => Number(b[1] - a[1]));
    const topRecipients = sorted.slice(0, 50).map(([address, amount], index) => ({
      rank: index + 1,
      address: address,
      amount: ethers.formatEther(amount),
      percentage: totalVolume > 0n ? (Number(amount) / Number(totalVolume)) * 100 : 0
    }));

    return {
      totalTransfers: transfers.length,
      uniqueRecipients: Object.keys(totals).length,
      totalVolume: ethers.formatEther(totalVolume),
      topRecipients: topRecipients,
      status: transfers.length > 0 ? 'active' : 'monitoring'
    };

  } finally {
    client.release();
  }
}

// Analyze Base Builder-related blockchain transfers
async function analyzeBaseBuilder() {
  const client = await pool.connect();
  try {
    // Query all reward contracts (excluding Farcaster and Base App specific ones)
    const allContracts = CONFIG.REWARD_CONTRACTS.map(addr => addr.toLowerCase());
    const farcasterContracts = CONFIG.FARCASTER_CONTRACTS.map(addr => addr.toLowerCase());
    const baseAppContracts = CONFIG.BASE_APP_CONTRACTS.map(addr => addr.toLowerCase());
    const excludedContracts = [...farcasterContracts, ...baseAppContracts];
    const builderContracts = allContracts.filter(addr => !excludedContracts.includes(addr));

    if (builderContracts.length === 0) {
      return {
        totalTransfers: 0,
        uniqueRecipients: 0,
        totalVolume: '0',
        topRecipients: [],
        status: 'monitoring'
      };
    }

    const query = `
      SELECT * FROM reward_events
      WHERE block_timestamp >= now() - ($1 || ' hours')::interval
      AND decoded_data IS NOT NULL
      AND LOWER(contract_address) = ANY($2)
    `;

    const res = await client.query(query, [CONFIG.ALERT_WINDOW_HOURS, builderContracts]);
    const transfers = res.rows;

    if (transfers.length === 0) {
      return {
        totalTransfers: 0,
        uniqueRecipients: 0,
        totalVolume: '0',
        topRecipients: [],
        status: 'monitoring'
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

    const sorted = Object.entries(totals).sort((a, b) => Number(b[1] - a[1]));
    const topRecipients = sorted.slice(0, 50).map(([address, amount], index) => ({
      rank: index + 1,
      address: address,
      amount: ethers.formatEther(amount),
      percentage: totalVolume > 0n ? (Number(amount) / Number(totalVolume)) * 100 : 0
    }));

    return {
      totalTransfers: transfers.length,
      uniqueRecipients: Object.keys(totals).length,
      totalVolume: ethers.formatEther(totalVolume),
      topRecipients: topRecipients,
      status: transfers.length > 0 ? 'active' : 'monitoring'
    };

  } finally {
    client.release();
  }
}

// Analyze Base App-related blockchain transfers
async function analyzeBaseApp() {
  const client = await pool.connect();
  try {
    // Query Base App specific contracts
    const baseAppContracts = CONFIG.BASE_APP_CONTRACTS.map(addr => addr.toLowerCase());

    if (baseAppContracts.length === 0) {
      return {
        totalTransfers: 0,
        uniqueRecipients: 0,
        totalVolume: '0',
        topRecipients: [],
        status: 'monitoring'
      };
    }

    const query = `
      SELECT * FROM reward_events
      WHERE block_timestamp >= now() - ($1 || ' hours')::interval
      AND decoded_data IS NOT NULL
      AND LOWER(contract_address) = ANY($2)
    `;

    const res = await client.query(query, [CONFIG.ALERT_WINDOW_HOURS, baseAppContracts]);
    const transfers = res.rows;

    if (transfers.length === 0) {
      return {
        totalTransfers: 0,
        uniqueRecipients: 0,
        totalVolume: '0',
        topRecipients: [],
        status: 'monitoring'
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

    const sorted = Object.entries(totals).sort((a, b) => Number(b[1] - a[1]));
    const topRecipients = sorted.slice(0, 50).map(([address, amount], index) => ({
      rank: index + 1,
      address: address,
      amount: ethers.formatEther(amount),
      percentage: totalVolume > 0n ? (Number(amount) / Number(totalVolume)) * 100 : 0
    }));

    return {
      totalTransfers: transfers.length,
      uniqueRecipients: Object.keys(totals).length,
      totalVolume: ethers.formatEther(totalVolume),
      topRecipients: topRecipients,
      status: transfers.length > 0 ? 'active' : 'monitoring'
    };

  } finally {
    client.release();
  }
}

// Generate historical data for 3-month reports
async function generateHistoricalData() {
  const client = await pool.connect();
  try {
    // Get data for the last 90 days, aggregated by day
    const res = await client.query(`
      SELECT
        DATE(block_timestamp) as date,
        COUNT(*) as total_transfers,
        COUNT(DISTINCT CASE WHEN decoded_data->>'to' IS NOT NULL THEN decoded_data->>'to' END) as unique_recipients,
        COALESCE(SUM(CAST(decoded_data->>'amount' AS NUMERIC)), 0) as total_volume,
        COUNT(CASE WHEN farcaster_related = true THEN 1 END) as farcaster_transfers,
        COUNT(DISTINCT CASE WHEN farcaster_related = true AND decoded_data->>'to' IS NOT NULL THEN decoded_data->>'to' END) as farcaster_recipients,
        COALESCE(SUM(CASE WHEN farcaster_related = true THEN CAST(decoded_data->>'amount' AS NUMERIC) ELSE 0 END), 0) as farcaster_volume
      FROM reward_events
      WHERE block_timestamp >= now() - '90 days'::interval
        AND decoded_data IS NOT NULL
      GROUP BY DATE(block_timestamp)
      ORDER BY date DESC
    `);

    const dailyData = res.rows.map(row => ({
      date: row.date,
      totalTransfers: parseInt(row.total_transfers),
      uniqueRecipients: parseInt(row.unique_recipients),
      totalVolume: ethers.formatEther(BigInt(row.total_volume.toString())),
      farcasterTransfers: parseInt(row.farcaster_transfers),
      farcasterRecipients: parseInt(row.farcaster_recipients),
      farcasterVolume: ethers.formatEther(BigInt(row.farcaster_volume.toString()))
    }));

    // Calculate cumulative metrics
    let cumulativeTransfers = 0;
    let cumulativeVolume = 0n;
    let cumulativeFarcasterTransfers = 0;
    let cumulativeFarcasterVolume = 0n;

    const enrichedData = dailyData.map(day => {
      cumulativeTransfers += day.totalTransfers;
      cumulativeVolume += BigInt(ethers.parseEther(day.totalVolume).toString());
      cumulativeFarcasterTransfers += day.farcasterTransfers;
      cumulativeFarcasterVolume += BigInt(ethers.parseEther(day.farcasterVolume).toString());

      return {
        ...day,
        cumulativeTransfers,
        cumulativeVolume: ethers.formatEther(cumulativeVolume),
        cumulativeFarcasterTransfers,
        cumulativeFarcasterVolume: ethers.formatEther(cumulativeFarcasterVolume)
      };
    });

    return {
      timestamp: new Date().toISOString(),
      period: '90_days',
      dailyData: enrichedData,
      summary: {
        totalDays: enrichedData.length,
        totalTransfers: cumulativeTransfers,
        totalVolume: ethers.formatEther(cumulativeVolume),
        totalFarcasterTransfers: cumulativeFarcasterTransfers,
        totalFarcasterVolume: ethers.formatEther(cumulativeFarcasterVolume),
        averageDailyTransfers: Math.round(cumulativeTransfers / Math.max(enrichedData.length, 1)),
        averageDailyVolume: ethers.formatEther(cumulativeVolume / BigInt(Math.max(enrichedData.length, 1)))
      }
    };

  } finally {
    client.release();
  }
}

// Export for Vercel serverless functions
export default app;

// Start server only when running locally (not on Vercel)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  try {
    const server = app.listen(PORT, () => {
      console.log(`🚀 Base Monitor API running on port ${PORT}`);
      console.log(`📊 Dashboard available at http://localhost:${PORT}`);
    });

    server.on('error', (error) => {
      console.error('❌ Server error:', error);
      process.exit(1);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }

  // Graceful shutdown for local development
  process.on('SIGTERM', () => {
    console.log('Shutting down gracefully...');
    pool.end();
    process.exit(0);
  });

  process.on('SIGINT', () => {
    console.log('Shutting down gracefully...');
    pool.end();
    process.exit(0);
  });
}