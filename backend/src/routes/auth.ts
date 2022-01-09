import express from 'express';
import { Signup, Login, UsersList } from '../controllers/auth.controller';
const router = express.Router();

router.post('/create-user', Signup);
router.post('/login', Login);
router.get('/all-users', UsersList);

export { router as authRouter };
