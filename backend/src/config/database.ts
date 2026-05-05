import { Pool } from 'pg';
import { env } from './env';

// Create pool but avoid running any connection or blocking logic at import time.
const pool = new Pool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PASSWORD || undefined, // Allow no password for local dev
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000, // Increased from 2000
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client:', err && err.message ? err.message : err);
});

export const query = async (text: string, params?: any[]): Promise<any> => {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    if (duration > 1000) {
      console.log('Executed query', { text, duration, rows: result.rowCount });
    }
    return result;
  } catch (error) {
    console.error('Database query error:', error, { text, params });
    throw error;
  }
};

export const getClient = async () => {
  return pool.connect();
};

export const closePool = async () => {
  await pool.end();
};

export default pool;
