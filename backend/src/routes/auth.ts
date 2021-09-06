import express from 'express';
import { Signup, Login, ActivateAccount } from '../controllers/auth.controller';
const router = express.Router();

router.post('/signup', Signup);
router.post('/login', Login);
router.post('/activate-account', ActivateAccount);

export { router as authRouter };
