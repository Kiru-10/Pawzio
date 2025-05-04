import * as personalitiesService from '../services/personalitiesService.js';

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

export const getAllPersonalities = (req, res) => handleResponse(res, personalitiesService.getAllPersonalities());
export const createPersonality = (req, res) => handleResponse(res, personalitiesService.createPersonality(req.body));
export const updatePersonality = (req, res) =>
  handleResponse(res, personalitiesService.updatePersonality(req.params.id, req.body));
export const deletePersonality = (req, res) =>
  handleResponse(res, personalitiesService.deletePersonality(req.params.id));
export const getPersonalityById = (req, res) =>
  handleResponse(res, personalitiesService.getPersonalityById(req.params.id));
