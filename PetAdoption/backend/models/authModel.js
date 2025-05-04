import { pool } from '../db.js';

const createUser = async ({ regNo, name, email, username, password }) => {
  const result = await pool.query(
    `INSERT INTO users (regNo, name, email, username, password)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, regNo, name, email, username`,
    [regNo, name, email, username, password]
  );
  return result.rows[0];
};

const findUserByUsername = async (username) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE username = $1`,
    [username]
  );
  return result.rows[0];
};

export default {
  createUser,
  findUserByUsername,
};
