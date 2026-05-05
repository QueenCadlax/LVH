import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

import { query, closePool } from '../config/database';
import { hashPassword } from '../utils/password';

const seedAdminUser = async () => {
  try {
    console.log('🌱 Seeding admin user...\n');

    const adminEmail = 'admin@lowveldhub.co.za';
    const adminPassword = 'admin123';
    const adminName = 'Admin User';

    // Check if admin user already exists
    const existingUser = await query(
      'SELECT id, email FROM users WHERE email = $1',
      [adminEmail]
    );

    if (existingUser.rows.length > 0) {
      console.log('⚠️  Admin user already exists');
      console.log(`✅ Email: ${existingUser.rows[0].email}`);
      console.log(`✅ ID: ${existingUser.rows[0].id}`);
    } else {
      // Hash the password
      const hashedPassword = await hashPassword(adminPassword);

      // Insert admin user
      const result = await query(
        `INSERT INTO users (email, password, "firstName", "lastName", "isVerified") 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING id, email, "firstName", "lastName"`,
        [adminEmail, hashedPassword, 'Admin', 'User', true]
      );

      const newUser = result.rows[0];
      console.log('✅ Admin user created successfully!');
      console.log(`✅ Email: ${newUser.email}`);
      console.log(`✅ ID: ${newUser.id}`);
      console.log(`✅ Name: ${newUser.firstName}`);
    }

    console.log('\n📝 Login credentials:');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    console.log('\n');

    await closePool();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin user:', error);
    await closePool();
    process.exit(1);
  }
};

seedAdminUser();
