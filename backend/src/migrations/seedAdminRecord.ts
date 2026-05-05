import pool from '../config/database';

const seedAdminRecord = async () => {
  try {
    // Check if user 3 exists
    const userRes = await pool.query('SELECT id FROM users WHERE id = $1', [3]);
    if (userRes.rows.length === 0) {
      console.log('User ID 3 (admin) not found. Skipping admin record seed.');
      return;
    }

    // Check if admin record already exists for user 3
    const adminRes = await pool.query('SELECT id FROM admins WHERE "userId" = $1', [3]);
    if (adminRes.rows.length > 0) {
      console.log('Admin record for user 3 already exists.');
      return;
    }

    // Create admin record for user 3
    await pool.query(
      `INSERT INTO admins ("userId", role, permissions, "createdAt", "updatedAt")
       VALUES ($1, $2, $3, NOW(), NOW())`,
      [3, 'admin', '{}']
    );
    console.log('✅ Admin record seeded for user 3');
  } catch (error: any) {
    console.error('Error seeding admin record:', error.message);
  }
};

seedAdminRecord().then(() => {
  process.exit(0);
}).catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
