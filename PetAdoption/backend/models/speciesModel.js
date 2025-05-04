import { pool } from '../db.js';

export const getAllSpecies = async () => {
  try {
    const { rows } = await pool.query('SELECT * FROM species ORDER BY id ASC');
    return rows;
  } catch (error) {
    console.error('Error in speciesModel.getAllSpecies:', error);
    throw new Error('Database error while fetching species.');
  }
};

export const createSpecies = async (name) => {
  const { rows } = await pool.query(
    'INSERT INTO species (name) VALUES ($1) RETURNING *',
    [name]
  );
  return rows[0];
};

export const updateSpecies = async (id, name) => {
  const { rows } = await pool.query(
    'UPDATE species SET name = $1 WHERE id = $2 RETURNING *',
    [name, id]
  );
  return rows[0];
};

export const deleteSpecies = async (id) => {
  await pool.query('DELETE FROM species WHERE id = $1', [id]);
};

export const findSpeciesById = async (id) => {
  const { rows } = await pool.query(
    'SELECT * FROM species WHERE id = $1',
    [id]
  );
  return rows[0];
};
