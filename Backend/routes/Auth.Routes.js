import express from 'express';
import { authController } from './authController.js';
import { authMiddleware } from './authMiddleware.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);


export default router;