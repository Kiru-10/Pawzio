import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

// Enhanced connection test
(async () => {
  let client;
  try {
    client = await pool.connect();
    console.log('✅ Database connected successfully');
    
    // Verify tables exist
    const tablesRes = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('📊 Existing tables:', tablesRes.rows.map(r => r.table_name));
    
  } catch (err) {
    console.error('❌ Database connection error:', err);
    process.exit(1);
  } finally {
    if (client) client.release();
  }
})();

pool.on('error', (err) => {
  console.error('💥 Unexpected database error:', err);
});

export { pool };