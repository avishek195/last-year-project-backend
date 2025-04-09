import express from 'express';
import { registerStudent, loginStudent, getStudentProfile, logoutStudent } from '../Controllers/StudentAuth.controller.js';
import isLogin from '../Middlewares/isLogin.js';

const router = express.Router();

// Public routes
router.post('/register', registerStudent);
router.post('/login', loginStudent);
router.get('/logout', logoutStudent);

// Protected routes
router.get('/profile', isLogin, getStudentProfile);

export default router; 