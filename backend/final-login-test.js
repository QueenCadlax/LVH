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
      },
      timeout: 5000
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

    req.on('error', (err) => {
      reject(new Error(`Request failed: ${err.message}`));
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (data) req.write(JSON.stringify(data));
    req.end();
  });
};

const testLogin = async () => {
  try {
    console.log('\n✅ FINAL ADMIN LOGIN TEST\n');
    
    console.log('📊 Backend: http://localhost:5000');
    console.log('📧 Email: admin@lowveld.co.za');
    console.log('🔑 Password: lowveld2026\n');

    const response = await makeRequest('POST', '/api/auth/login', {
      email: 'admin@lowveld.co.za',
      password: 'lowveld2026'
    });

    console.log(`Status Code: ${response.status}`);

    if (response.status === 200 && response.data.token) {
      console.log('\n✅ LOGIN SUCCESSFUL!\n');
      console.log('🎯 Admin Details:');
      console.log(`   ID: ${response.data.user.id}`);
      console.log(`   Email: ${response.data.user.email}`);
      console.log(`   Name: ${response.data.user.firstName} ${response.data.user.lastName}`);
      console.log(`\n🔐 JWT Token: ${response.data.token.substring(0, 50)}...`);
      console.log(`\n📋 Next: Start frontend and visit admin login page`);
      console.log(`   Frontend: http://localhost:3000/admin/login`);
      console.log(`   Or: npm run dev\n`);
    } else {
      console.log('❌ Login failed');
      console.log(`Response: ${JSON.stringify(response.data)}`);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

testLogin();
