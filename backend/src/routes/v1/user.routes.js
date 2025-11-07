import express from 'express';
import { login, signup, verifyOtp } from '../../controllers/user.auth.controller.js';
import { validateUserSignup } from '../../middlewares/validateUser.signup.js';
const router = express.Router();

router.post('/signup', validateUserSignup, signup);
router.post('/auth/verify-otp', verifyOtp);
router.post('/login', login);

export default router;