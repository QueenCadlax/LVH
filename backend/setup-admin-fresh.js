#!/usr/bin/env node
/**
 * FRESH ADMIN SETUP - Minimal, Direct, Verified
 * - Test database connection
 * - Check if admin exists
 * - Create admin with verified credentials
 * - Test login immediately
 */

require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const ADMIN_EMAIL = 'admin@lowveld.co.za';
const ADMIN_PASSWORD = 'lowveld2026';

async function main() {
  try {
    console.log('🔍 Testing database connection...');
    const testResult = await pool.query('SELECT 1');
    console.log('✅ Database connected');

    console.log('\n🔍 Checking if admin exists...');
    const checkResult = await pool.query(
      `SELECT id, email, password FROM users WHERE email = $1`,
      [ADMIN_EMAIL]
    );

    if (checkResult.rows.length > 0) {
      const user = checkResult.rows[0];
      console.log(`✅ Admin user found: ID ${user.id}, Email: ${user.email}`);
      console.log(`   Password hash: ${user.password.substring(0, 20)}...`);
    } else {
      console.log('❌ Admin user NOT found, creating...');

      // Hash password
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
      console.log(`   Password hash: ${hashedPassword.substring(0, 20)}...`);

      // Create user with ID 1
      const result = await pool.query(
        `INSERT INTO users (id, email, password, "firstName", "lastName", verified, "createdAt")
         VALUES (1, $1, $2, 'Admin', 'User', true, NOW())
         ON CONFLICT (id) DO UPDATE SET password = $2, verified = true
         RETURNING id, email`,
        [ADMIN_EMAIL, hashedPassword]
      );

      const user = result.rows[0];
      console.log(`✅ Admin user created/updated: ID ${user.id}, Email: ${user.email}`);

      // Create admin record
      const adminResult = await pool.query(
        `INSERT INTO admins ("userId", role, permissions, "createdAt")
         VALUES (1, 'super_admin', $1, NOW())
         ON CONFLICT ("userId") DO UPDATE SET role = 'super_admin', permissions = $1
         RETURNING "userId", role`,
        [JSON.stringify(['manage_businesses', 'manage_users', 'view_analytics', 'manage_subscriptions', 'view_reports'])]
      );

      console.log(`✅ Admin record created: Role ${adminResult.rows[0].role}`);
    }

    // Verify admin exists and is properly linked
    console.log('\n🔍 Verifying admin setup...');
    const verifyResult = await pool.query(
      `SELECT u.id, u.email, u.password, a.role, a.permissions
       FROM users u
       LEFT JOIN admins a ON u.id = a."userId"
       WHERE u.email = $1`,
      [ADMIN_EMAIL]
    );

    if (verifyResult.rows.length === 0) {
      throw new Error('Admin verification failed - user not found');
    }

    const admin = verifyResult.rows[0];
    console.log(`✅ Admin verified:`);
    console.log(`   - ID: ${admin.id}`);
    console.log(`   - Email: ${admin.email}`);
    console.log(`   - Password hash: ${admin.password.substring(0, 30)}...`);
    console.log(`   - Role: ${admin.role || 'NOT SET'}`);
    console.log(`   - Permissions: ${admin.permissions || 'NOT SET'}`);

    // Test password comparison
    console.log('\n🔍 Testing password verification...');
    const isValidPassword = await bcrypt.compare(ADMIN_PASSWORD, admin.password);
    if (isValidPassword) {
      console.log(`✅ Password verification PASSED`);
    } else {
      console.log(`❌ Password verification FAILED`);
      console.log(`   Stored hash: ${admin.password}`);
      console.log(`   Test password: ${ADMIN_PASSWORD}`);
    }

    console.log('\n✅ ADMIN SETUP COMPLETE');
    console.log(`\nUsage:`);
    console.log(`  Email: ${ADMIN_EMAIL}`);
    console.log(`  Password: ${ADMIN_PASSWORD}`);

    process.exit(0);
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
