import express from 'express';
import authController from '../controllers/authController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Example protected route
router.get('/profile', protect, (req, res) => {
  res.json({ message: 'Secure profile info 🎯', user: req.user });
});

export default router;
