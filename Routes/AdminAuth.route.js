import express from 'express';
import {
    registerAdmin,
    loginAdmin,
    getAdminProfile,
    logoutAdmin
} from '../Controllers/AdminAuth.controller.js';
import isAdmin from '../Middlewares/isAdmin.js';

const router = express.Router();

// Public routes
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/logout', logoutAdmin);

// Protected routes - requires admin authentication
router.get('/profile', isAdmin, getAdminProfile);

export default router; 