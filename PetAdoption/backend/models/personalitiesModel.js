import { pool } from '../db.js';

export const getAllPersonalities = async () => {
  const { rows } = await pool.query('SELECT * FROM personalities ORDER BY id ASC');
  return rows;
};

export const createPersonality = async (name) => {
  const { rows } = await pool.query(
    'INSERT INTO personalities (name) VALUES ($1) RETURNING *',
    [name]
  );
  return rows[0];
};

export const updatePersonality = async (id, name) => {
  const { rows } = await pool.query(
    'UPDATE personalities SET name = $1 WHERE id = $2 RETURNING *',
    [name, id]
  );
  return rows[0];
};

export const deletePersonality = async (id) => {
  await pool.query('DELETE FROM personalities WHERE id = $1', [id]);
};

export const findPersonalityById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM personalities WHERE id = $1', [id]);
  return rows[0];
};
