import adoptedService from '../services/adoptedService.js';

const getAllAdopted = async (req, res) => {
  try {
    const adoptedPets = await adoptedService.getAllAdopted();
    res.status(200).json(adoptedPets);
  } catch (error) {
    console.error('Error fetching adopted pets:', error);
    res.status(500).json({ error: 'Failed to fetch adopted pets' });
  }
};

export default {
  getAllAdopted,
};
