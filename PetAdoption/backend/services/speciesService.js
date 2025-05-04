import * as speciesModel from '../models/speciesModel.js';
import { ValidationError, NotFoundError } from '../utils/errors.js';

export const getAllSpecies = async () => {
  const species = await speciesModel.getAllSpecies();
  if (!species || species.length === 0) {
    throw new NotFoundError('No species found.');
  }
  return species;
};

export const createSpecies = async ({ name }) => {
  if (!name || name.trim() === '') {
    throw new ValidationError('Species name is required.', { name });
  }
  return await speciesModel.createSpecies(name.trim());
};

export const updateSpecies = async (id, { name }) => {
  if (isNaN(id)) {
    throw new ValidationError('Invalid species ID.', { id });
  }
  if (!name || name.trim() === '') {
    throw new ValidationError('Species name is required.', { name });
  }
  const updated = await speciesModel.updateSpecies(id, name.trim());
  if (!updated) {
    throw new NotFoundError('Species not found.');
  }
  return updated;
};

export const deleteSpecies = async (id) => {
  if (isNaN(id)) {
    throw new ValidationError('Invalid species ID.', { id });
  }
  const existing = await speciesModel.findSpeciesById(id);
  if (!existing) {
    throw new NotFoundError('Species not found.');
  }
  await speciesModel.deleteSpecies(id);
};

export const getSpeciesById = async (id) => {
  if (isNaN(id)) {
    throw new ValidationError('Invalid species ID.', { id });
  }
  const species = await speciesModel.findSpeciesById(id);
  if (!species) {
    throw new NotFoundError('Species not found.');
  }
  return species;
};

