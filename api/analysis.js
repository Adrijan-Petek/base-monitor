// Vercel API route handler for /api/analysis
import { runAnalysis } from './analyzer.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Check for Vercel cron secret if this looks like a cron job
  const authHeader = req.headers.authorization;
  const userAgent = req.headers['user-agent'] || '';

  // If it's a cron job call, verify the secret
  if (userAgent.includes('vercel-cron') || req.headers['x-vercel-cron']) {
    if (process.env.VERCEL_CRON_SECRET && authHeader !== `Bearer ${process.env.VERCEL_CRON_SECRET}`) {
      return res.status(401).json({ error: 'Unauthorized cron job' });
    }
  }

  try {
    console.log('Starting analysis...');
    const analysisData = await runAnalysis();
    console.log('Analysis completed successfully');

    res.status(200).json(analysisData);
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({
      error: 'Analysis failed',
      message: error.message,
      baseBlockchain: {
        gini: 0,
        top10Share: 0,
        uniqueRecipients: 0,
        manipulationScore: 0,
        topRecipients: []
      },
      farcaster: {
        totalCasts: 0,
        uniqueAuthors: 0,
        top10Share: 0,
        manipulationScore: 0,
        topAuthors: []
      },
      timestamp: new Date().toISOString()
    });
  }
}