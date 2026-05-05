/**
 * Database Migration: Create Products & Product Reports Tables
 * Run: npm run migrate
 */

import pool from '../config/database';

export async function createProductsTables() {
  try {
    console.log('📦 Creating products tables...');

    // Create products table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        condition VARCHAR(50) NOT NULL,
        price_value DECIMAL(10, 2) NOT NULL,
        stock INTEGER DEFAULT 1,
        images TEXT[] NOT NULL,
        seller_id VARCHAR(255),
        seller_name VARCHAR(255) NOT NULL,
        seller_email VARCHAR(255) NOT NULL,
        seller_phone VARCHAR(20),
        seller_type VARCHAR(50) DEFAULT 'individual',
        pricing_tier VARCHAR(50) NOT NULL DEFAULT 'free',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP,
        status VARCHAR(50) DEFAULT 'active',
        reported_count INTEGER DEFAULT 0,
        report_reasons TEXT[] DEFAULT '{}',
        is_suspended BOOLEAN DEFAULT false,
        removal_reason TEXT,
        featured BOOLEAN DEFAULT false
      );
    `);

    // Create product_reports table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS product_reports (
        id VARCHAR(50) PRIMARY KEY,
        product_id VARCHAR(50) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        reported_by VARCHAR(255),
        reporter_email VARCHAR(255),
        reason VARCHAR(100) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(50) DEFAULT 'pending'
      );
    `);

    // Create indexes for better query performance
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_products_seller_id ON products(seller_id);
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_products_reported_count ON products(reported_count);
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_product_reports_product_id ON product_reports(product_id);
    `);

    console.log('✓ Products tables created successfully');
  } catch (error) {
    console.error('❌ Error creating products tables:', error);
    throw error;
  }
}

// Run migration
createProductsTables()
  .then(() => {
    console.log('✓ Migration complete');
    process.exit(0);
  })
  .catch(error => {
    console.error('✗ Migration failed:', error);
    process.exit(1);
  });
