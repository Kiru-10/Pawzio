import FeedbackService from '../services/feedbackService.js';

const FeedbackController = {
  async addFeedback(req, res) {
    try {
      const { name, email, comment, rating } = req.body;
      if (!name || !email || !comment || !rating) {
        return res.status(400).json({ error: "All fields are required" });
      }
      const feedback = await FeedbackService.addFeedback({ name, email, comment, rating });
      res.status(201).json(feedback);
    } catch (err) {
      console.error("Error in addFeedback:", err);
      res.status(500).json({ error: "Server error" });
    }
  },

  async getAllFeedback(req, res) {
    try {
      const feedbacks = await FeedbackService.getAllFeedback();
      res.status(200).json(feedbacks);
    } catch (err) {
      console.error("Error in getAllFeedback:", err);
      res.status(500).json({ error: "Server error" });
    }
  },

  async getFeedbackById(req, res) {
    try {
      const { id } = req.params;
      const feedback = await FeedbackService.getFeedbackById(id);
      if (!feedback) {
        return res.status(404).json({ error: "Feedback not found" });
      }
      res.status(200).json(feedback);
    } catch (err) {
      console.error("Error in getFeedbackById:", err);
      res.status(500).json({ error: "Server error" });
    }
  },
};

export default FeedbackController;
