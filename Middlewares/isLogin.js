import jwt from 'jsonwebtoken';
import ResponseHandler from '../Utils/ResponseHandler.js';
import StudentAuth from '../Models/StudentAuth.model.js';

const isLogin = async (req, res, next) => {
    try {
        // Get token from cookie
        const token = req.cookies.token;

        // Check if token exists
        if (!token) {
            return ResponseHandler.error(res, "Authentication required. Please login", 401);
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

        // Check if student exists
        const student = await StudentAuth.findById(decoded.id).select('-password');
        if (!student) {
            return ResponseHandler.error(res, "Student not found", 401);
        }

        // Set student ID in request object
        req.studentId = student._id;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        
        if (error.name === 'JsonWebTokenError') {
            return ResponseHandler.error(res, "Invalid token", 401);
        }
        
        if (error.name === 'TokenExpiredError') {
            return ResponseHandler.error(res, "Token expired. Please login again", 401);
        }
        
        return ResponseHandler.error(res, "Authentication failed", 500, error);
    }
};

export default isLogin;
