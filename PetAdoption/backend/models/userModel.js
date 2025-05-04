import { pool } from '../db.js';

export const getAllUsers = async () => {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
};

export const getUserById = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

export const updateUser = async (id, { name, email, username, password }) => {
  const result = await pool.query(
    `UPDATE users
     SET name = $1, email = $2, username = $3, password = $4
     WHERE id = $5 RETURNING *`,
    [name, email, username, password, id]
  );
  return result.rowCount > 0 ? result.rows[0] : null;
};
