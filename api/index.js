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
  } else if (req.url === '/' || req.url === '/index.html') {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Base Monitor</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .status { color: green; }
    </style>
</head>
<body>
    <h1>🚀 Base Monitor</h1>
    <p class="status">✅ API is running successfully!</p>
    <p>Check <a href="/api/test">/api/test</a> endpoint</p>
</body>
</html>
    `);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
}