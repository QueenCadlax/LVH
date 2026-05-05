// Load environment variables FIRST (matching backend's approach)
require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const bcrypt = require('bcrypt');
const { Pool } = require('pg');

// Create pool exactly like backend does
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME || 'lowveldhub',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : 'postgres',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
  console.error('❌ Pool error:', err.message);
});

const createAdmin = async () => {
  try {
    console.log('\n🔐 Creating REAL admin account...\n');
    console.log('📋 Configuration:');
    console.log(`   DB Host: ${process.env.DB_HOST}`);
    console.log(`   DB Name: ${process.env.DB_NAME}`);
    console.log(`   DB User: ${process.env.DB_USER}\n`);

    const email = 'admin@lowveld.co.za';
    const password = 'lowveld2026';

    // ✅ STEP 1: Hash password with bcrypt
    console.log('✅ STEP 1: Hashing password with bcrypt (10 rounds)...');
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`   Hash: ${hashedPassword.substring(0, 20)}...\n`);

    // ✅ STEP 2: Upsert user (create or update)
    console.log('✅ STEP 2: Creating/updating user in database...');
    const userResult = await pool.query(
      `INSERT INTO users (email, password, "firstName", "lastName", "isVerified", "createdAt", "updatedAt") 
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
       ON CONFLICT (email) 
       DO UPDATE SET password = EXCLUDED.password, "updatedAt" = NOW()
       RETURNING id, email, "firstName", "lastName", "isVerified"`,
      [email, hashedPassword, 'Admin', 'Lowveld', true]
    );

    const user = userResult.rows[0];
    const userId = user.id;
    console.log(`   ✓ User ID: ${userId}`);
    console.log(`   ✓ Email: ${user.email}`);
    console.log(`   ✓ Name: ${user.firstName} ${user.lastName}`);
    console.log(`   ✓ Verified: ${user.isVerified}\n`);

    // ✅ STEP 3: Create/update admin record
    console.log('✅ STEP 3: Creating/updating admin record...');
    const permissions = ['manage_businesses', 'manage_users', 'view_analytics', 'manage_subscriptions', 'view_reports'];
    const adminResult = await pool.query(
      `INSERT INTO admins ("userId", role, permissions, "createdAt", "updatedAt")
       VALUES ($1, $2, $3, NOW(), NOW())
       ON CONFLICT ("userId")
       DO UPDATE SET role = 'super_admin', "updatedAt" = NOW()
       RETURNING id, role, permissions`,
      [
        userId, 
        'super_admin',
        permissions
      ]
    );

    const admin = adminResult.rows[0];
    console.log(`   ✓ Admin ID: ${admin.id}`);
    console.log(`   ✓ Role: ${admin.role}`);
    console.log(`   ✓ Permissions: ${Array.isArray(admin.permissions) ? admin.permissions.join(', ') : admin.permissions}\n`);

    // ✅ STEP 4: Verify the admin (REQUIRED)
    console.log('✅ STEP 4: Verifying admin account in database...');
    const verifyResult = await pool.query(
      `SELECT u.id, u.email, u."firstName", u."lastName", u."isVerified", 
              a.id as "adminId", a.role, a.permissions
       FROM users u
       LEFT JOIN admins a ON u.id = a."userId"
       WHERE u.email = $1`,
      [email]
    );

    if (verifyResult.rows.length === 0) {
      throw new Error('Admin verification failed - user not found');
    }

    const verified = verifyResult.rows[0];
    console.log('   ✓ User found in database');
    console.log('   ✓ Admin record linked');
    console.log('   ✓ Role is super_admin\n');

    // ✅ Display final summary
    console.log('═══════════════════════════════════════════════════════');
    console.log('✅ ADMIN ACCOUNT CREATED SUCCESSFULLY');
    console.log('═══════════════════════════════════════════════════════\n');
    console.log('📋 ADMIN DETAILS:');
    console.log(`   User ID: ${verified.id}`);
    console.log(`   Admin ID: ${verified.adminId}`);
    console.log(`   Email: ${verified.email}`);
    console.log(`   Name: ${verified.firstName} ${verified.lastName}`);
    console.log(`   Role: ${verified.role}`);
    console.log(`   Verified: ${verified.isVerified}\n`);

    console.log('🎯 LOGIN CREDENTIALS:');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}\n`);

    console.log('📝 NEXT STEPS:');
    console.log('   1. Start backend: npm run build && node dist/server.js');
    console.log('   2. Start frontend: npm run dev');
    console.log('   3. Navigate to admin login page');
    console.log('   4. Enter credentials above');
    console.log('   5. Admin dashboard should load\n');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('   → PostgreSQL not running or wrong host/port');
    } else if (error.code === '28P01') {
      console.error('   → Database authentication failed - check DB_PASSWORD');
    }
    process.exit(1);
  } finally {
    await pool.end();
  }
};

createAdmin();
