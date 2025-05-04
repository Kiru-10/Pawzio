import express from 'express';
import {
  getAllSpecies,
  createSpecies,
  updateSpecies,
  deleteSpecies,
  getSpeciesById
} from '../controllers/speciesController.js';

const router = express.Router();

router.get('/', getAllSpecies);
router.post('/', createSpecies);
router.put('/:id', updateSpecies);
router.delete('/:id', deleteSpecies);
router.get('/:id', getSpeciesById);

export default router;