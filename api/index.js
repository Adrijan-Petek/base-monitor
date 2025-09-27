// Vercel API route handler
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Handle different routes
  if (req.url === '/api/test') {
    res.status(200).json({
      message: 'Base Monitor API is working!',
      timestamp: new Date().toISOString()
    });
  } else {
    res.status(404).json({
      error: 'Not Found',
      message: 'This API endpoint does not exist'
    });
  }
}