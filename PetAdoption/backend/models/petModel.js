import { pool } from '../db.js';

export const createPet = async ({ name, species_id, age, personality_id }) => {
  const { rows } = await pool.query(
    `INSERT INTO pets (name, species_id, age, personality_id)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, species_id, age, personality_id]
  );
  return rows[0];
};

export const getAllPets = async () => {
  const { rows } = await pool.query(`
    SELECT pets.*, species.name AS species, personalities.name AS personality,
    CASE WHEN adopted THEN 'Adopted' ELSE calculate_mood(created_at) END as mood
    FROM pets
    JOIN species ON pets.species_id = species.id
    JOIN personalities ON pets.personality_id = personalities.id
  `);
  return rows;
};

export const getPetById = async (id) => {
  const { rows } = await pool.query(
    `SELECT pets.*, species.name AS species, personalities.name AS personality
     FROM pets
     JOIN species ON pets.species_id = species.id
     JOIN personalities ON pets.personality_id = personalities.id
     WHERE pets.id = $1`,
    [id]
  );
  return rows[0] || null;
};

export const updatePet = async (id, { name, species_id, age, personality_id }) => {
  const { rows } = await pool.query(
    `UPDATE pets 
     SET name = $1, species_id = $2, age = $3, personality_id = $4, updated_at = NOW()
     WHERE id = $5 
     RETURNING *`,
    [name, species_id, age, personality_id, id]
  );
  return rows[0];
};

// export const adoptPet = async (id) => {
//   const { rows } = await pool.query(
//     `UPDATE pets 
//      SET adopted = true, adoption_date = NOW()
//      WHERE id = $1 AND NOT adopted
//      RETURNING *`,
//     [id]
//   );
//   return rows[0];
// };

export const deletePet = async (id) => {
  await pool.query('DELETE FROM pets WHERE id = $1', [id]);
};

export const filterPetsByMood = async (mood) => {
  const { rows } = await pool.query(
    `SELECT pets.*, species.name AS species, personalities.name AS personality
     FROM pets
     JOIN species ON pets.species_id = species.id
     JOIN personalities ON pets.personality_id = personalities.id
     WHERE calculate_mood(created_at) = $1 AND NOT adopted`,
    [mood]
  );
  return rows;
};

export const adoptPet = async (id, userId) => {
  // First update the pet's adopted status
  const { rows: petRows } = await pool.query(
    `UPDATE pets 
     SET adopted = true, adoption_date = NOW()
     WHERE id = $1 AND NOT adopted
     RETURNING *`,
    [id]
  );

  if (petRows.length === 0) {
    return null;
  }

  // Then create the adoption record
  await pool.query(
    `INSERT INTO adoptpet (pet_id, user_id)
     VALUES ($1, $2)`,
    [id, userId]
  );

  return petRows[0];
};