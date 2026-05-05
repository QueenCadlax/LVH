// Simple script to register and set up admin via backend API
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

const setupAdmin = async () => {
  try {
    console.log('\n🔐 Setting up admin via backend API...\n');

    const email = 'admin@lowveld.co.za';
    const password = 'lowveld2026';

    // Step 1: Try to register
    console.log('✅ STEP 1: Registering admin user...');
    const registerResponse = await makeRequest('POST', '/api/auth/register', {
      email: email,
      password: password,
      firstName: 'Admin',
      lastName: 'Lowveld'
    });

    console.log(`   Status: ${registerResponse.status}`);
    
    if (registerResponse.status === 201 || registerResponse.status === 200) {
      console.log(`   ✓ Registration successful`);
      if (registerResponse.data.token) {
        console.log(`   ✓ Token received: ${registerResponse.data.token.substring(0, 20)}...\n`);
        var token = registerResponse.data.token;
      }
    } else if (registerResponse.status === 409) {
      console.log(`   ⚠️  User already exists (409)\n`);
      console.log('✅ STEP 2: Logging in with existing account...');
      const loginResponse = await makeRequest('POST', '/api/auth/login', {
        email: email,
        password: password
      });
      console.log(`   Status: ${loginResponse.status}`);
      if (loginResponse.status === 200) {
        console.log(`   ✓ Login successful`);
        if (loginResponse.data.token) {
          console.log(`   ✓ Token received: ${loginResponse.data.token.substring(0, 20)}...\n`);
          var token = loginResponse.data.token;
        }
      } else {
        console.log(`   ✗ Login failed: ${JSON.stringify(loginResponse.data)}\n`);
        console.log('⚠️ Possible causes:');
        console.log('   1. Database not set up correctly');
        console.log('   2. User created but password doesn\'t match');
        console.log('   3. Admin table not created\n');
        process.exit(1);
      }
    } else {
      console.log(`   ✗ Registration failed: ${JSON.stringify(registerResponse.data)}\n`);
      process.exit(1);
    }

    // Step 3: Check admin status
    console.log('✅ STEP 3: Verifying admin status...');
    const verifyResponse = await makeRequest('GET', '/api/auth/verify', null);
    
    if (verifyResponse.status === 200 && verifyResponse.data.user) {
      const user = verifyResponse.data.user;
      console.log(`   ✓ User ID: ${user.id}`);
      console.log(`   ✓ Email: ${user.email}\n`);
      console.log('📋 User created successfully\n');
    } else {
      console.log(`   ✗ Token verification failed\n`);
    }

    console.log('═══════════════════════════════════════════════════════');
    console.log('✅ ADMIN REGISTRATION COMPLETE');
    console.log('═══════════════════════════════════════════════════════\n');

    console.log('🎯 LOGIN CREDENTIALS:');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}\n`);

    console.log('📝 NEXT STEPS:');
    console.log('   1. Start frontend: npm run dev (from root)');
    console.log('   2. Navigate to login page');
    console.log('   3. Click "Admin Login"');
    console.log('   4. Enter email and password above');
    console.log('   5. You should see the admin dashboard\n');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    process.exit(1);
  }
};

// Wait for backend to be ready
setTimeout(setupAdmin, 1000);
