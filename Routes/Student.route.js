import express from 'express';
import { createStudentInfo, getAllStudents } from '../Controllers/Student.controller.js';
import isLogin from '../Middlewares/isLogin.js';
import isAdmin from '../Middlewares/isAdmin.js';

const router = express.Router();

// Create student profile - protected route requiring authentication
router.post('/create', isLogin, createStudentInfo);

// Admin routes - require admin authentication
// /api/v1/students/all?page=1&limit=10
router.get('/all', isAdmin, getAllStudents);

export default router;
