import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';
import { enable2FA } from '../controllers/userController.js';
import protect from '../middleware/authmiddleware.js';
import { verify2FA } from '../controllers/userController.js';

const router = express.Router();




// @route   POST /api/users/register
router.post('/register', registerUser);

// @route   POST /api/users/login
router.post('/login', loginUser);

router.post('/enable-2fa', protect, enable2FA);

router.post('/verify-2fa', protect, verify2FA);

export default router;
