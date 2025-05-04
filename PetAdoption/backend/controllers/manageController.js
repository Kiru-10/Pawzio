// import { manageService } from '../services/manageService.js';

// export const manageController = {
//   // Species
//   async getSpecies(req, res) {
//     try {
//       const data = await manageService.getSpecies();
//       res.json(data);
//     } catch (err) {
//       res.status(500).json({ error: 'Failed to fetch species.' });
//     }
//   },

//   async addSpecies(req, res) {
//     try {
//       const { name } = req.body;
//       const data = await manageService.addSpecies(name);
//       res.status(201).json(data);
//     } catch (err) {
//       res.status(500).json({ error: 'Failed to add species.' });
//     }
//   },

//   async updateSpecies(req, res) {
//     try {
//       const { id } = req.params;
//       const { name } = req.body;
//       const data = await manageService.updateSpecies(id, name);
//       res.json(data);
//     } catch (err) {
//       res.status(500).json({ error: 'Failed to update species.' });
//     }
//   },

//   async deleteSpecies(req, res) {
//     try {
//       const { id } = req.params;
//       await manageService.deleteSpecies(id);
//       res.sendStatus(204);
//     } catch (err) {
//       res.status(500).json({ error: 'Failed to delete species.' });
//     }
//   },

//   // Personality
//   async getPersonalities(req, res) {
//     try {
//       const data = await manageService.getPersonalities();
//       res.json(data);
//     } catch (err) {
//       res.status(500).json({ error: 'Failed to fetch personalities.' });
//     }
//   },

//   async addPersonality(req, res) {
//     try {
//       const { name } = req.body;
//       const data = await manageService.addPersonality(name);
//       res.status(201).json(data);
//     } catch (err) {
//       res.status(500).json({ error: 'Failed to add personality.' });
//     }
//   },

//   async updatePersonality(req, res) {
//     try {
//       const { id } = req.params;
//       const { name } = req.body;
//       const data = await manageService.updatePersonality(id, name);
//       res.json(data);
//     } catch (err) {
//       res.status(500).json({ error: 'Failed to update personality.' });
//     }
//   },

//   async deletePersonality(req, res) {
//     try {
//       const { id } = req.params;
//       await manageService.deletePersonality(id);
//       res.sendStatus(204);
//     } catch (err) {
//       res.status(500).json({ error: 'Failed to delete personality.' });
//     }
//   }
// };
