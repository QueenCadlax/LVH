import pool from '../config/database';

export async function createPendingSubmissionsTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS pending_submissions (
      id SERIAL PRIMARY KEY,
      business_name VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      sub_category VARCHAR(100),
      location VARCHAR(255) NOT NULL,
      address VARCHAR(500),
      contact_email VARCHAR(255),
      contact_phone VARCHAR(50) NOT NULL,
      description TEXT,
      operating_hours JSONB DEFAULT '{}',
      services TEXT,
      amenities JSONB DEFAULT '[]',
      menu_url VARCHAR(500),
      logo_url VARCHAR(500),
      images JSONB DEFAULT '[]',
      videos JSONB DEFAULT '[]',
      proof_of_business_url VARCHAR(500),
      facebook_url VARCHAR(500),
      instagram_url VARCHAR(500),
      twitter_url VARCHAR(500),
      tiktok_url VARCHAR(500),
      linkedin_url VARCHAR(500),
      youtube_url VARCHAR(500),
      website_url VARCHAR(500),
      selected_package VARCHAR(50) NOT NULL CHECK (selected_package IN ('essential', 'professional', 'platinum')),
      package_amount NUMERIC(10, 2) NOT NULL,
      submitted_at TIMESTAMP DEFAULT NOW(),
      status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
      admin_feedback TEXT,
      rejection_reason VARCHAR(500),
      approved_by INTEGER REFERENCES users(id),
      approved_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_pending_submissions_status ON pending_submissions(status);
    CREATE INDEX IF NOT EXISTS idx_pending_submissions_category ON pending_submissions(category);
    CREATE INDEX IF NOT EXISTS idx_pending_submissions_submitted_at ON pending_submissions(submitted_at DESC);
  `;

  try {
    await pool.query(query);
    console.log('✅ pending_submissions table created successfully');
  } catch (error) {
    console.error('❌ Error creating pending_submissions table:', error);
    throw error;
  }
}

export async function runMigration() {
  try {
    await createPendingSubmissionsTable();
    console.log('✅ Migration 001_create_pending_submissions completed');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}
