import express from 'express';
import { getContacts, submitContact } from '../controllers/contactController.js';

const router = express.Router();

// Route to fetch all contacts
router.get('/', getContacts);

// Route to submit a new contact message
router.post('/', submitContact);

export default router;
