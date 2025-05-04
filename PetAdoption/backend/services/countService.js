import { getCounts } from '../models/countModel.js';

export const fetchAllCounts = async () => {
  return await getCounts();
};
