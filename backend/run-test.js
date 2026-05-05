#!/usr/bin/env node
/**
 * Test runner - writes results to file to avoid terminal issues
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const HOST = '127.0.0.1';
const PORT = 5000;
const OUTPUT_FILE = path.join(__dirname, 'test-results.txt');

let output = [];

function log(msg) {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${msg}`;
  output.push(line);
  console.log(line);
}

function makeRequest(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: HOST,
      port: PORT,
      path: path,
      method: method,
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000,
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', (err) => reject(err));
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });

    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runTests() {
  log('=== BACKEND LOGIN TEST ===');
  log('Target: http://127.0.0.1:5000');

  // Test health
  try {
    log('Testing /health...');
    const result = await makeRequest('/health');
    log(`✅ Health OK: ${JSON.stringify(result.data)}`);
  } catch (err) {
    log(`❌ Health FAILED: ${err.message}`);
  }

  // Test login
  try {
    log('Testing /api/auth/login...');
    const result = await makeRequest('/api/auth/login', 'POST', {
      email: 'admin@lowveld.co.za',
      password: 'lowveld2026',
    });

    if (result.status === 200) {
      log(`✅ Login SUCCESS`);
      log(`   User: ${result.data.user.email}`);
      log(`   Token: ${result.data.token.substring(0, 20)}...`);
    } else {
      log(`❌ Login FAILED (${result.status}): ${JSON.stringify(result.data)}`);
    }
  } catch (err) {
    log(`❌ Login ERROR: ${err.message}`);
  }

  // Write to file
  fs.writeFileSync(OUTPUT_FILE, output.join('\n'));
  log(`\nResults written to: ${OUTPUT_FILE}`);
}

runTests().catch(err => {
  log(`ERROR: ${err.message}`);
  fs.writeFileSync(OUTPUT_FILE, output.join('\n'));
  process.exit(1);
});
