#!/usr/bin/env node

/**
 * Simple script to test the LowveldHub API endpoints
 * Run with: node test-api.js
 */

import http from 'http';

function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: `/api${path}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: data ? JSON.parse(data) : null,
        });
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('\n🧪 Testing LowveldHub API Endpoints\n');

  try {
    // Test 1: Health check
    console.log('1️⃣  Testing /health endpoint...');
    const health = await makeRequest('GET', '/health');
    console.log(`   Status: ${health.status}`);
    console.log(`   Response:`, health.body);

    // Test 2: Register a test user
    console.log('\n2️⃣  Registering test user...');
    const registerResponse = await makeRequest('POST', '/auth/register', {
      email: `test-${Date.now()}@test.com`,
      password: 'TestPassword123!',
      name: 'Test User',
    });
    console.log(`   Status: ${registerResponse.status}`);
    if (registerResponse.status === 200 || registerResponse.status === 201) {
      console.log(`   ✅ User registered successfully`);
      console.log(`   Response:`, registerResponse.body);
    } else {
      console.log(`   ❌ Registration failed`);
      console.log(`   Response:`, registerResponse.body);
    }

    // Test 3: Login
    const testEmail = `test-${Date.now()}@test.com`;
    console.log('\n3️⃣  Logging in with admin credentials...');
    const loginResponse = await makeRequest('POST', '/auth/login', {
      email: 'admin@lowveldhub.co.za',
      password: 'admin123',
    });
    console.log(`   Status: ${loginResponse.status}`);
    if (loginResponse.body?.token) {
      console.log(`   ✅ Login successful`);
      const token = loginResponse.body.token;
      console.log(`   Token received: ${token.substring(0, 20)}...`);

      // Test 4: Get dashboard with token
      console.log('\n4️⃣  Testing /user/dashboard endpoint with JWT...');
      const dashboardReq = new Promise((resolve, reject) => {
        const options = {
          hostname: 'localhost',
          port: 5000,
          path: '/api/user/dashboard',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        };

        const req = http.request(options, (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => {
            resolve({
              status: res.statusCode,
              body: data ? JSON.parse(data) : null,
            });
          });
        });

        req.on('error', reject);
        req.end();
      });

      const dashboardResponse = await dashboardReq;
      console.log(`   Status: ${dashboardResponse.status}`);
      if (dashboardResponse.status === 200) {
        console.log(`   ✅ Dashboard endpoint working!`);
        console.log(`   Response data structure:`);
        if (dashboardResponse.body?.data) {
          console.log(`     - user: ${dashboardResponse.body.data.user ? '✅' : '❌'}`);
          console.log(`     - loyalty: ${dashboardResponse.body.data.loyalty ? '✅' : '❌'}`);
          console.log(`     - referrals: ${dashboardResponse.body.data.referrals ? '✅' : '❌'}`);
          console.log(`     - messages: ${dashboardResponse.body.data.messages ? '✅' : '❌'}`);
          console.log(`     - recent_activity: ${dashboardResponse.body.data.recent_activity ? '✅' : '❌'}`);
        }
      } else {
        console.log(`   ❌ Dashboard endpoint failed`);
        console.log(`   Response:`, dashboardResponse.body);
      }
    } else {
      console.log(`   ❌ Login failed`);
      console.log(`   Response:`, loginResponse.body);
    }
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('   Is the backend server running on port 5000?');
    console.error('   Run: cd backend && npm run dev');
  }

  console.log('\n✅ Tests complete!\n');
}

runTests();
