// Debug admin login issue
const http = require('http');

const makeRequest = (method, path, data) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: responseData });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
};

const debugLogin = async () => {
  try {
    console.log('\n🔍 Debugging admin login issue...\n');

    // First, try to register a test user
    console.log('📝 Step 1: Register test user...');
    const registerResponse = await makeRequest('POST', '/api/auth/register', {
      email: 'test@lowveld.co.za',
      password: 'test1234',
      firstName: 'Test',
      lastName: 'User'
    });
    console.log(`   Status: ${registerResponse.status}`);
    if (registerResponse.status === 201) {
      console.log('   ✅ Test user registered');
    } else if (registerResponse.status === 409) {
      console.log('   ℹ️  Test user already exists (that\'s ok)');
    } else {
      console.log(`   ❌ Error: ${JSON.stringify(registerResponse.data)}`);
    }

    // Try to login with test user
    console.log('\n🔑 Step 2: Login with test user...');
    const testLoginResponse = await makeRequest('POST', '/api/auth/login', {
      email: 'test@lowveld.co.za',
      password: 'test1234'
    });
    console.log(`   Status: ${testLoginResponse.status}`);
    if (testLoginResponse.status === 200) {
      console.log('   ✅ Test user login successful!');
      console.log(`   Token: ${testLoginResponse.data.token.substring(0, 30)}...`);
    } else {
      console.log(`   ❌ Test user login failed: ${JSON.stringify(testLoginResponse.data)}`);
    }

    // Try to login with admin
    console.log('\n👑 Step 3: Login with admin...');
    const adminLoginResponse = await makeRequest('POST', '/api/auth/login', {
      email: 'admin@lowveld.co.za',
      password: 'lowveld2026'
    });
    console.log(`   Status: ${adminLoginResponse.status}`);
    if (adminLoginResponse.status === 200) {
      console.log('   ✅ Admin login successful!');
      console.log(`   Token: ${adminLoginResponse.data.token.substring(0, 30)}...`);
      console.log(`   User: ${adminLoginResponse.data.user.email}`);
    } else {
      console.log(`   ❌ Admin login failed: ${JSON.stringify(adminLoginResponse.data)}`);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

debugLogin();
