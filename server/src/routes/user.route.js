import express from 'express';
import handleUserData from '../controllers/user.controller.js';
const router = express.Router();
import handleAuthVerify from '../middlewares/auth.middleware.js';

router.get('/', handleAuthVerify, handleUserData);

export default router;