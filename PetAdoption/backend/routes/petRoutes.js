import express from 'express';
import {
  createPet,
  getAllPets,
  getPetById,
  updatePet,
  adoptPet,
  deletePet,
  filterPetsByMood
} from '../controllers/petController.js';
import  protect  from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', createPet);
router.get('/', getAllPets);
router.get('/filter/mood', filterPetsByMood); 
router.get('/:id', getPetById);
router.put('/:id', updatePet);
// router.patch('/:id/adopt', adoptPet);
router.delete('/:id', deletePet);
router.patch('/:id/adopt', protect, adoptPet);

export default router;
