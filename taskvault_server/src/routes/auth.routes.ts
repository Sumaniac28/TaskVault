import { Router } from 'express';
import { signup, login, getMe } from '@/controllers/auth.controller';
import { validateSignup, validateLogin } from '@/middleware/validator.middleware';
import { authenticate } from '@/middleware/auth.middleware';

const router = Router();

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);
router.get('/me', authenticate, getMe);

export default router;
