import dotenv from 'dotenv';

// Load environment variables FIRST before any other imports
dotenv.config({ path: require('path').join(__dirname, '../../.env') });

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { query, getClient, closePool } from '../config/database';

const runMigrations = async () => {
  try {
    console.log('🔄 Running database migrations...\n');

    // Get all migration files in order
    const migrationsDir = __dirname;
    const files = readdirSync(migrationsDir)
      .filter(f => f.startsWith('00') && f.endsWith('.sql'))
      .sort();

    let totalStatements = 0;
    let completedStatements = 0;

    for (const file of files) {
      console.log(`📄 Running migration: ${file}`);
      const migrationPath = join(migrationsDir, file);
      const migrationSql = readFileSync(migrationPath, 'utf-8');

      // Split by semicolon to handle multiple statements
      const statements = migrationSql
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0);

      for (let i = 0; i < statements.length; i++) {
        totalStatements++;
        try {
          await query(statements[i]);
          completedStatements++;
          console.log(`✅ Statement ${completedStatements}/${totalStatements} completed`);
        } catch (error: any) {
          // Some statements might fail if tables/indices already exist - that's OK
          if (error.message.includes('already exists') || error.message.includes('ALREADY EXISTS')) {
            completedStatements++;
            console.log(`⚠️  Statement ${completedStatements}/${totalStatements} skipped (already exists)`);
          } else {
            console.error(`❌ Statement ${i + 1} failed in ${file}:`, error.message);
            throw error;
          }
        }
      }
    }

    console.log('\n✅ All database migrations completed successfully!');
    console.log('📊 Tables created:');
    console.log('  - users (Phase 1)');
    console.log('  - businesses (Phase 2)');
    console.log('  - admins (Phase 3)');
    console.log('  - admin_logs (Phase 3)');
    console.log('  - subscriptions (Phase 3)');
    console.log('  - payments (Phase 3)');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await closePool();
  }
};

runMigrations();
