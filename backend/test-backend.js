#!/usr/bin/env node
/**
 * Backend Test Script - Tests health and admin login
 * Usage: node test-backend.js
 */

const http = require('http');

// Configuration
const HOST = '127.0.0.1';
const PORT = 5000;
const ADMIN_CREDENTIALS = {
  email: 'admin@lowveld.co.za',
  password: 'lowveld2026',
};

// Helper to log results
const logResult = (title, result) => {
  console.log("\n==============================");
  console.log(title);
  console.log("==============================");
  console.log(JSON.stringify(result, null, 2));
};

// Helper to make HTTP request
const makeRequest = (path, method = 'GET', body = null) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: HOST,
      port: PORT,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000,
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ status: res.statusCode, data: json });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', (err) => {
      console.error(`[DEBUG] Request error for ${path}:`, err.message);
      reject(err);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
};

// 1️⃣ Test server health
const testHealth = async () => {
  try {
    const result = await makeRequest('/health');
    logResult("✅ Server Health", result.data);
  } catch (err) {
    logResult("❌ Server Health ERROR", { error: err.message });
  }
};

// 2️⃣ Test admin login
const testLogin = async () => {
  try {
    const result = await makeRequest('/api/auth/login', 'POST', ADMIN_CREDENTIALS);
    if (result.status === 200) {
      logResult("✅ Admin Login SUCCESS", {
        success: result.data.success,
        message: result.data.message,
        user: result.data.user,
        token: result.data.token ? `${result.data.token.substring(0, 20)}...` : null,
      });
    } else {
      logResult("❌ Admin Login FAILED", { status: result.status, error: result.data });
    }
  } catch (err) {
    logResult("❌ Admin Login ERROR", { error: err.message });
  }
};

// Run tests
const runTests = async () => {
  console.log("\n🔐 Testing LowveldHub Backend...\n");
  await testHealth();
  await testLogin();
  console.log("\n✅ Test complete!\n");
};

runTests().catch(console.error);
