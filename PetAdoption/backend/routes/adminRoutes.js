import express from 'express';
import adminController from '../controllers/adminController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', adminController.register);
router.post('/login', adminController.login);
router.post('/logout', adminController.logout);

// Example protected route for admins
router.get('/profile', protect, (req, res) => {
  res.json({ message: 'Secure admin profile info 🎯', admin: req.user });
});

// Get admin profile by ID
router.get('/:id', protect, adminController.getById);

// Update admin profile by ID
router.put('/:id', protect, adminController.update);

export default router;
