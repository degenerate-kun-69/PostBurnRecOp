import express from 'express';
import { signup } from '../Controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);

export default router;