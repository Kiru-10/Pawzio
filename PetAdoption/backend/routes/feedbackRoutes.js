import express from 'express';
import FeedbackController from '../controllers/feedbackController.js';

const router = express.Router();

router.post('/', FeedbackController.addFeedback);
router.get('/', FeedbackController.getAllFeedback); 
router.get('/:id', FeedbackController.getFeedbackById);  

export default router;
