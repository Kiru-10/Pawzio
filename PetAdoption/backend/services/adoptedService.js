import adoptedModel from '../models/adoptedModel.js';

const getAllAdopted = async () => {
  const adopted = await adoptedModel.getAllAdoptedPets();
  return adopted.map(row => ({
    pet: {
      name: row.pet_name,
      age: row.age,
      species: row.species_name,
      personality: row.personality_name,
    },
    owner: {
      regno: row.regno,
      name: row.owner_name,
      email: row.email,
      adoptionDate: row.adoption_date,
    },
  }));
};

export default {
  getAllAdopted,
};
