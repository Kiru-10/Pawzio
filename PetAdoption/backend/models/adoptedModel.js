import { pool } from '../db.js';

const getAllAdoptedPets = async () => {
  const query = `
    SELECT 
      pets.name AS pet_name,
      species.name AS species_name,
      pets.age,
      personalities.name AS personality_name,
      users.regno,
      users.name AS owner_name,
      users.email,
      adoptpet.adoption_date
    FROM adoptpet
    JOIN pets ON adoptpet.pet_id = pets.id
    JOIN users ON adoptpet.user_id = users.id
    JOIN species ON pets.species_id = species.id
    JOIN personalities ON pets.personality_id = personalities.id
    ORDER BY adoptpet.adoption_date DESC
  `;
  
  const result = await pool.query(query);
  return result.rows;
};

export default {
  getAllAdoptedPets,
};
