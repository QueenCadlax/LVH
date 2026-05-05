const express = require('express');

const app = express();

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const server = app.listen(5000, '0.0.0.0', () => {
  console.log('✅ Simple test server is listening on port 5000');
});

// Keep alive
process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

console.log('Server script loaded');
