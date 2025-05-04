import FeedbackModel from '../models/feedbackModel.js';

const FeedbackService = {
  async addFeedback(data) {
    return await FeedbackModel.createFeedback(data);
  },

  async getAllFeedback() {
    return await FeedbackModel.fetchAllFeedback();
  },

  async getFeedbackById(id) {
    return await FeedbackModel.fetchFeedbackById(id);
  },
};

export default FeedbackService;
