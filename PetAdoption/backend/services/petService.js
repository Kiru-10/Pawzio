import * as petModel from '../models/petModel.js';
import { ValidationError, NotFoundError } from '../utils/errors.js';

const validatePet = (petData, isUpdate = false) => {
  const errors = {};

  if (!isUpdate || petData.name !== undefined) {
    if (!petData.name?.trim()) errors.name = 'Name is required';
  }

  if (!isUpdate || petData.species_id !== undefined) {
    if (!Number.isInteger(Number(petData.species_id))) {
      errors.species_id = 'Valid species ID is required';
    }
  }

  if (!isUpdate || petData.age !== undefined) {
    if (!Number.isInteger(petData.age) || petData.age < 0) {
      errors.age = 'Age must be a positive integer';
    }
  }

  if (!isUpdate || petData.personality_id !== undefined) {
    if (!Number.isInteger(Number(petData.personality_id))) {
      errors.personality_id = 'Valid personality ID is required';
    }
  }

  if (Object.keys(errors).length > 0) {
    throw new ValidationError('Invalid pet data', errors);
  }
};

export const createPet = async (petData) => {
  petData.age = parseInt(petData.age, 10);
  petData.species_id = parseInt(petData.species_id, 10);
  petData.personality_id = parseInt(petData.personality_id, 10);
  validatePet(petData);
  return await petModel.createPet(petData);
};


export const getAllPets = async () => {
  return await petModel.getAllPets();
};

export const getPetById = async (id) => {
  const pet = await petModel.getPetById(id);
  if (!pet) throw new NotFoundError('Pet not found');
  return pet;
};

export const updatePet = async (id, petData) => {
  validatePet(petData, true);
  const pet = await petModel.updatePet(id, petData);
  if (!pet) throw new NotFoundError('Pet not found');
  return pet;
};

// export const adoptPet = async (id) => {
//   const pet = await petModel.adoptPet(id);
//   if (!pet) throw new NotFoundError('Pet not found or already adopted');
//   return pet;
// };

export const deletePet = async (id) => {
  await getPetById(id); 
  await petModel.deletePet(id);
};

export const filterPetsByMood = async (mood) => {
  const validMoods = ['Happy', 'Excited', 'Sad'];
  if (!validMoods.includes(mood)) {
    throw new ValidationError('Invalid mood filter', { 
      mood: `Must be one of: ${validMoods.join(', ')}` 
    });
  }
  return await petModel.filterPetsByMood(mood);
};

export const adoptPet = async (id, userId) => {
  const pet = await petModel.adoptPet(id, userId);
  if (!pet) throw new NotFoundError('Pet not found or already adopted');
  return pet;
};