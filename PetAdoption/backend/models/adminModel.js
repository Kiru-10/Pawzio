import { pool } from '../db.js';

const createAdmin = async ({ regNo, name, email, username, password }) => {
  const result = await pool.query(
    `INSERT INTO admins (regNo, name, email, username, password)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, regNo, name, email, username`,
    [regNo, name, email, username, password]
  );
  return result.rows[0];
};

const findAdminByUsername = async (username) => {
  const result = await pool.query(
    `SELECT * FROM admins WHERE username = $1`,
    [username]
  );
  return result.rows[0];
};

const findAdminById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM admins WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

const updateAdmin = async (id, { regNo, name, email, username, password }) => {
  const result = await pool.query(
    `UPDATE admins 
     SET regNo = $1, name = $2, email = $3, username = $4, password = $5
     WHERE id = $6
     RETURNING id, regNo, name, email, username`,
    [regNo, name, email, username, password, id]
  );
  return result.rows[0];
};

export default {
  createAdmin,
  findAdminByUsername,
  findAdminById,
  updateAdmin,
};
