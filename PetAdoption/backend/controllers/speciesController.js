import * as speciesService from '../services/speciesService.js';

const handleResponse = (res, promise) => {
  promise
    .then(data => res.json({ success: true, data }))
    .catch(error =>
      res.status(error.statusCode || 500).json({
        success: false,
        error: error.message,
        details: error.details || null
      })
    );
};

export const getAllSpecies = (req, res) => handleResponse(res, speciesService.getAllSpecies());
export const createSpecies = (req, res) => handleResponse(res, speciesService.createSpecies(req.body));
export const updateSpecies = (req, res) => handleResponse(res, speciesService.updateSpecies(req.params.id, req.body));
export const deleteSpecies = (req, res) => handleResponse(res, speciesService.deleteSpecies(req.params.id));
export const getSpeciesById = (req, res) => handleResponse(res, speciesService.getSpeciesById(req.params.id));

