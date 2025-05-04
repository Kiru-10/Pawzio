import { pool } from '../db.js';

const FeedbackModel = {
  async createFeedback({ name, email, comment, rating }) {
    const result = await pool.query(
      'INSERT INTO feedback (name, email, comment, rating, visible) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, comment, rating, true]
    );
    return result.rows[0];
  },

  async fetchAllFeedback() {
    const result = await pool.query('SELECT * FROM feedback');
    return result.rows;
  },

  async fetchFeedbackById(id) {
    const result = await pool.query('SELECT * FROM feedback WHERE id = $1', [id]);
    return result.rows[0];
  },
};

export default FeedbackModel;
