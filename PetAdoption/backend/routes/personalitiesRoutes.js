import express from 'express';
import {
  getAllPersonalities,
  createPersonality,
  updatePersonality,
  deletePersonality,
  getPersonalityById
} from '../controllers/personalitiesController.js';

const router = express.Router();

router.get('/', getAllPersonalities);
router.post('/', createPersonality);
router.put('/:id', updatePersonality);
router.delete('/:id', deletePersonality);
router.get('/:id', getPersonalityById);

export default router;
