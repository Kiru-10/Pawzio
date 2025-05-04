import * as petService from '../services/petService.js';

const handleResponse = (res, promise) => {
  promise
    .then(data => res.json({ success: true, data }))
    .catch(error => res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
      details: error.details
    }));
};

export const createPet = (req, res) => handleResponse(res, petService.createPet(req.body));
export const getAllPets = (req, res) => handleResponse(res, petService.getAllPets());
export const getPetById = (req, res) => handleResponse(res, petService.getPetById(req.params.id));
export const updatePet = (req, res) => handleResponse(res, petService.updatePet(req.params.id, req.body));
// export const adoptPet = (req, res) => handleResponse(res, petService.adoptPet(req.params.id));
export const deletePet = (req, res) => handleResponse(res, petService.deletePet(req.params.id));
export const filterPetsByMood = (req, res) => handleResponse(res, petService.filterPetsByMood(req.query.mood));
export const adoptPet = (req, res) => {
  // Get user ID from the authenticated user (assuming you have middleware that adds user to req)
  const userId = req.user.id;
  handleResponse(res, petService.adoptPet(req.params.id, userId));
};