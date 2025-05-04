import * as personalitiesModel from '../models/personalitiesModel.js';
import { ValidationError, NotFoundError } from '../utils/errors.js';

export const getAllPersonalities = async () => {
  const data = await personalitiesModel.getAllPersonalities();
  if (!data || data.length === 0) {
    throw new NotFoundError('No personalities found.');
  }
  return data;
};

export const createPersonality = async ({ name }) => {
  if (!name || name.trim() === '') {
    throw new ValidationError('Personality name is required.', { name });
  }
  return await personalitiesModel.createPersonality(name.trim());
};

export const updatePersonality = async (id, { name }) => {
  if (isNaN(id)) {
    throw new ValidationError('Invalid personality ID.', { id });
  }
  if (!name || name.trim() === '') {
    throw new ValidationError('Personality name is required.', { name });
  }
  const updated = await personalitiesModel.updatePersonality(id, name.trim());
  if (!updated) {
    throw new NotFoundError('Personality not found.');
  }
  return updated;
};

export const deletePersonality = async (id) => {
  if (isNaN(id)) {
    throw new ValidationError('Invalid personality ID.', { id });
  }
  const existing = await personalitiesModel.findPersonalityById(id);
  if (!existing) {
    throw new NotFoundError('Personality not found.');
  }
  await personalitiesModel.deletePersonality(id);
};

export const getPersonalityById = async (id) => {
  if (isNaN(id)) {
    throw new ValidationError('Invalid personality ID.', { id });
  }
  const personality = await personalitiesModel.findPersonalityById(id);
  if (!personality) {
    throw new NotFoundError('Personality not found.');
  }
  return personality;
};
