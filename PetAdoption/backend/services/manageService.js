// import { manageModel } from '../models/manageModel.js';
// import { ValidationError, NotFoundError } from '../utils/errors.js'; 

// export const manageService = {
//   async getSpecies() {
//     try {
//       const species = await manageModel.getSpecies();
//       if (!species || species.length === 0) {
//         throw new NotFoundError('No species found.');
//       }
//       return species;
//     } catch (err) {
//       throw err instanceof NotFoundError ? err : new Error('Failed to fetch species.');
//     }
//   },

//   async addSpecies(name) {
//     try {
//       if (!name || name.trim() === '') {
//         throw new ValidationError('Species name is required.', { name });
//       }
//       return await manageModel.addSpecies(name);
//     } catch (err) {
//       throw err instanceof ValidationError ? err : new Error('Failed to add species.');
//     }
//   },

//   async updateSpecies(id, name) {
//     try {
//       if (!name || name.trim() === '') {
//         throw new ValidationError('Species name is required.', { name });
//       }

//       const species = await manageModel.updateSpecies(id, name);
//       if (!species) {
//         throw new NotFoundError('Species not found.');
//       }
//       return species;
//     } catch (err) {
//       throw err instanceof NotFoundError || err instanceof ValidationError ? err : new Error('Failed to update species.');
//     }
//   },

//   async deleteSpecies(id) {
//     try {
//       const species = await manageModel.deleteSpecies(id);
//       if (!species) {
//         throw new NotFoundError('Species not found.');
//       }
//       return species;
//     } catch (err) {
//       throw err instanceof NotFoundError ? err : new Error('Failed to delete species.');
//     }
//   },

//   async getPersonalities() {
//     try {
//       const personalities = await manageModel.getPersonalities();
//       if (!personalities || personalities.length === 0) {
//         throw new NotFoundError('No personalities found.');
//       }
//       return personalities;
//     } catch (err) {
//       throw err instanceof NotFoundError ? err : new Error('Failed to fetch personalities.');
//     }
//   },

//   async addPersonality(name) {
//     try {
//       if (!name || name.trim() === '') {
//         throw new ValidationError('Personality name is required.', { name });
//       }
//       return await manageModel.addPersonality(name);
//     } catch (err) {
//       throw err instanceof ValidationError ? err : new Error('Failed to add personality.');
//     }
//   },

//   async updatePersonality(id, name) {
//     try {
//       if (!name || name.trim() === '') {
//         throw new ValidationError('Personality name is required.', { name });
//       }

//       const personality = await manageModel.updatePersonality(id, name);
//       if (!personality) {
//         throw new NotFoundError('Personality not found.');
//       }
//       return personality;
//     } catch (err) {
//       throw err instanceof NotFoundError || err instanceof ValidationError ? err : new Error('Failed to update personality.');
//     }
//   },

//   async deletePersonality(id) {
//     try {
//       const personality = await manageModel.deletePersonality(id);
//       if (!personality) {
//         throw new NotFoundError('Personality not found.');
//       }
//       return personality;
//     } catch (err) {
//       throw err instanceof NotFoundError ? err : new Error('Failed to delete personality.');
//     }
//   }
// };
