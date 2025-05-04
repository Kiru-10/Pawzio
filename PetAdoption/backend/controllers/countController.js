import { fetchAllCounts } from '../services/countService.js';

export const getCounts = async (req, res) => {
  try {
    const counts = await fetchAllCounts();
    res.status(200).json({ success: true, data: counts });
  } catch (error) {
    console.error('Error getting counts:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch counts' });
  }
};
