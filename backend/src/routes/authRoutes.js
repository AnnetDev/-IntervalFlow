import express from 'express';
import { register, login } from '../controllers/authController.js';
import { authLimiter, loginLimiter } from '../middleware/ratelimiter.js';

const router = express.Router(); // Create a new router instance

// POST /api/auth/register - Register a new user
router.post('/register', authLimiter, register);

// POST /api/auth/login - Authenticate user and get token   
router.post('/login', loginLimiter, login );

export default router; 