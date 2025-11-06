import express from 'express';
import { login, signup } from '../../controllers/user.auth.controller.js';
import { validateUserSignup } from '../../middlewares/validateUser.signup.js';
const router = express.Router();

router.post('/', validateUserSignup, signup);
router.get('/', login);

export default router;