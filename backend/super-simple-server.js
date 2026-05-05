#!/usr/bin/env node
/**
 * SUPER SIMPLE TEST SERVER - Absolute minimum
 */

require('dotenv').config();
const http = require('http');

const PORT = parseInt(process.env.PORT || '5000', 10);

console.log(`[${new Date().toISOString()}] Starting server on port ${PORT}...`);

const server = http.createServer((req, res) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.on('error', (err) => {
  console.error(`[${new Date().toISOString()}] Server error:`, err);
  process.exit(1);
});

server.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] ✅ Server LISTENING on port ${PORT}`);
});

// Make sure we don't exit
process.stdin.resume();

process.on('SIGINT', () => {
  console.log('\nShutting down...');
  server.close();
  process.exit(0);
});
