import { pool } from '../db.js';

export const getCounts = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT 
        (SELECT COUNT(*) FROM pets) AS total_pets,
        (SELECT COUNT(*) FROM users) AS total_users,
        (SELECT COUNT(*) FROM adoptpet) AS total_adoptions,
        (SELECT COUNT(*) FROM feedback) AS total_feedbacks
    `);
    return result.rows[0];
  } finally {
    client.release();
  }
};
