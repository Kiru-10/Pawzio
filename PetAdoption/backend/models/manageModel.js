// import { pool } from '../db.js';

// export const manageModel = {
//   async getAll(table) {
//     const res = await pool.query(`SELECT * FROM ${table} ORDER BY id ASC`);
//     return res.rows;
//   },

//   async addItem(table, name) {
//     const res = await pool.query(
//       `INSERT INTO ${table} (name) VALUES ($1) RETURNING *`,
//       [name]
//     );
//     return res.rows[0];
//   },

//   async updateItem(table, id, name) {
//     const res = await pool.query(
//       `UPDATE ${table} SET name = $1 WHERE id = $2 RETURNING *`,
//       [name, id]
//     );
//     return res.rows[0];
//   },

//   async deleteItem(table, id) {
//     await pool.query(`DELETE FROM ${table} WHERE id = $1`, [id]);
//   },

//   // Specific functions for species and personalities
//   async getSpecies() {
//     return await this.getAll('species');
//   },

//   async addSpecies(name) {
//     return await this.addItem('species', name);
//   },

//   async updateSpecies(id, name) {
//     return await this.updateItem('species', id, name);
//   },

//   async deleteSpecies(id) {
//     return await this.deleteItem('species', id);
//   },

//   async getPersonalities() {
//     return await this.getAll('personalities');
//   },

//   async addPersonality(name) {
//     return await this.addItem('personalities', name);
//   },

//   async updatePersonality(id, name) {
//     return await this.updateItem('personalities', id, name);
//   },

//   async deletePersonality(id) {
//     return await this.deleteItem('personalities', id);
//   }
// };
