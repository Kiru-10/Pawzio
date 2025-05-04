import express from 'express';
import adoptedController from '../controllers/adoptedController.js';

const router = express.Router();

router.get('/', adoptedController.getAllAdopted);

export default router;
