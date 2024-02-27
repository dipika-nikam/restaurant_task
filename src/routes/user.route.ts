import express from 'express';
import { 
userRegisterHandler,
userLoginHandler,
forgotPassword,
changePassword
} from '../controllers/user.controllers';

import { authenticateToken } from '../middleware/auth.middleware'

const router = express.Router();

router.post('/register', userRegisterHandler)
router.post('/login', userLoginHandler)
router.post('/forgot-password', authenticateToken, forgotPassword)
router.post('/change-password', authenticateToken, changePassword)

export default router;
