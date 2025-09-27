const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Simple test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Base Monitor API is working!', timestamp: new Date().toISOString() });
});

// Simple static file serving
app.get('/', (req, res) => {
  res.send(`
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
});

// Export for Vercel serverless functions
module.exports = app;