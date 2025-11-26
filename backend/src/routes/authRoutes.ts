import { Router } from 'express';
import { signup, login } from '../controllers/authController';
import { validateSignup, validateLogin, handleValidationErrors } from '../middleware/validators';

const router = Router();

// POST /api/auth/signup
router.post('/signup', validateSignup, handleValidationErrors, signup);

// POST /api/auth/login
router.post('/login', validateLogin, handleValidationErrors, login);

export default router;