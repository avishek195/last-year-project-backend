import jwt from 'jsonwebtoken';
import ResponseHandler from '../Utils/ResponseHandler.js';
import Admin from '../Models/Admin.model.js';

const isAdmin = async (req, res, next) => {
    try {
        // Get token from cookie
        const token = req.cookies.adminToken;

        // Check if token exists
        if (!token) {
            return ResponseHandler.error(res, "Admin authentication required", 401);
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET || 'admin-secret-key');

        // Check if admin exists
        const admin = await Admin.findById(decoded.id).select('-password');
        if (!admin) {
            return ResponseHandler.error(res, "Admin not found", 401);
        }

        // Check if admin account is active
        if (!admin.isActive) {
            return ResponseHandler.error(res, "Admin account has been deactivated", 401);
        }

        // Set admin ID in request object
        req.adminId = admin._id;
        req.adminRole = admin.role;
        next();
    } catch (error) {
        console.error("Admin authentication error:", error);
        
        if (error.name === 'JsonWebTokenError') {
            return ResponseHandler.error(res, "Invalid admin token", 401);
        }
        
        if (error.name === 'TokenExpiredError') {
            return ResponseHandler.error(res, "Admin token expired. Please login again", 401);
        }
        
        return ResponseHandler.error(res, "Admin authentication failed", 500, error);
    }
};

export default isAdmin; 