#!/usr/bin/env node

// Start the backend server with proper error handling
const spawn = require('child_process').spawn;
const path = require('path');

console.log('🚀 Starting LowveldHub Backend...\n');

const server = spawn('node', [path.join(__dirname, 'dist', 'server.js')], {
  stdio: 'inherit',
  cwd: __dirname
});

server.on('close', (code) => {
  console.log(`\n❌ Server exited with code ${code}`);
  process.exit(code || 1);
});

server.on('error', (error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});

// Handle signals
process.on('SIGTERM', () => {
  console.log('\n📍 SIGTERM received, shutting down...');
  server.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('\n📍 SIGINT received, shutting down...');
  server.kill('SIGINT');
});
