import { pool } from '../db.js';

export const getContactsFromDB = async () => {
  try {
    const res = await pool.query('SELECT * FROM contacts ORDER BY date DESC');
    return res.rows;
  } catch (error) {
    throw new Error("Error fetching contacts from database: " + error.message);
  }
};

export const addContactToDB = async ({ name, email, phone, message }) => {
  try {
    const query = `
      INSERT INTO contacts (name, email, phone, message, date)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING *;
    `;
    const values = [name, email, phone, message];
    const res = await pool.query(query, values);
    return res.rows[0]; // Return the newly added contact
  } catch (error) {
    throw new Error("Error inserting contact into database: " + error.message);
  }
};
