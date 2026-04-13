import pg from 'pg';
import { config } from 'dotenv';

config();

const { Pool } = pg;

/**
 * PostgreSQL Connection Pool
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

/**
 * Query helper
 */
export async function query(text: string, params?: (string | number | null)[]) {
  const start = Date.now();

  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;

    if (process.env.DEBUG) {
      console.log('Executed query', { text, duration, rows: result.rowCount });
    }

    return result;
  } catch (error) {
    console.error('Database query error', { text, error });
    throw error;
  }
}

/**
 * Get a client from pool for transactions
 */
export async function getClient() {
  const client = await pool.connect();
  return client;
}

/**
 * Initialize database schema
 */
export async function initializeDatabase() {
  try {
    // Users table
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        public_key VARCHAR(56) UNIQUE NOT NULL,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE,
        bio TEXT,
        avatar_url VARCHAR(500),
        role VARCHAR(20) DEFAULT 'creator',
        verified BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Projects table
    await query(`
      CREATE TABLE IF NOT EXISTS projects (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        logo_url VARCHAR(500),
        website VARCHAR(500),
        verified BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Tasks table
    await query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        reward_amount NUMERIC(20, 7) NOT NULL,
        reward_token VARCHAR(10) DEFAULT 'XLM',
        category VARCHAR(50),
        status VARCHAR(20) DEFAULT 'active',
        deadline TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Submissions table
    await query(`
      CREATE TABLE IF NOT EXISTS submissions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
        creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        submission_url VARCHAR(500),
        submission_text TEXT,
        status VARCHAR(20) DEFAULT 'submitted',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Payments table
    await query(`
      CREATE TABLE IF NOT EXISTS payments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
        recipient_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        amount NUMERIC(20, 7) NOT NULL,
        token VARCHAR(10) DEFAULT 'XLM',
        tx_hash VARCHAR(64),
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW(),
        completed_at TIMESTAMP
      );
    `);

    console.log('✓ Database schema initialized');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

/**
 * Close connection pool
 */
export async function closePool() {
  await pool.end();
}

export default pool;
