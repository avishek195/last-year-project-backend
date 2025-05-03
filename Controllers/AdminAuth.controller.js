import Admin from "../Models/Admin.model.js";
import ResponseHandler from "../Utils/ResponseHandler.js";
import jwt from "jsonwebtoken";

// Register new admin
const registerAdmin = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Validate required fields
    if (!email || !username || !password) {
      return ResponseHandler.error(
        res,
        "Email, username, and password are required",
        400
      );
    }

    // Check if email already exists
    const existingEmail = await Admin.findOne({ email });
    if (existingEmail) {
      return ResponseHandler.error(res, "Email already registered", 400);
    }

    // Check if username already exists
    const existingUsername = await Admin.findOne({ username });
    if (existingUsername) {
      return ResponseHandler.error(res, "Username already taken", 400);
    }

    // Create new admin
    const newAdmin = new Admin({
      email,
      username,
      password,
    });

    // Save to database - password will be hashed by pre-save middleware
    const savedAdmin = await newAdmin.save();

    // Don't send password in response
    const adminData = {
      _id: savedAdmin._id,
      email: savedAdmin.email,
      username: savedAdmin.username,
      role: savedAdmin.role,
      createdAt: savedAdmin.createdAt,
    };

    return ResponseHandler.success(
      res,
      adminData,
      "Admin registered successfully",
      201
    );
  } catch (error) {
    console.error("Error registering admin:", error);
    return ResponseHandler.error(res, "Error registering admin", 500, error);
  }
};

// Login admin
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return ResponseHandler.error(res, "Email and password are required", 400);
    }

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return ResponseHandler.error(res, "Invalid credentials", 401);
    }

    // Check if admin account is active
    if (!admin.isActive) {
      return ResponseHandler.error(
        res,
        "This account has been deactivated",
        401
      );
    }

    // Compare passwords
    const isPasswordMatch = await admin.comparePassword(password);
    if (!isPasswordMatch) {
      return ResponseHandler.error(res, "Invalid credentials", 401);
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_ADMIN_SECRET || "admin-secret-key",
      { expiresIn: "1d" }
    );

    // Set token in cookie
    res.cookie("adminToken", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return ResponseHandler.success(
      res,
      {
        _id: admin._id,
        email: admin.email,
        username: admin.username,
        role: admin.role,
      },
      "Login successful"
    );
  } catch (error) {
    console.error("Error logging in:", error);
    return ResponseHandler.error(res, "Error during login", 500, error);
  }
};

// Get admin profile
const getAdminProfile = async (req, res) => {
  try {
    const adminId = req.adminId;

    const admin = await Admin.findById(adminId).select("-password");
    if (!admin) {
      return ResponseHandler.error(res, "Admin not found", 404);
    }

    return ResponseHandler.success(
      res,
      admin,
      "Admin profile retrieved successfully"
    );
  } catch (error) {
    console.error("Error retrieving admin profile:", error);
    return ResponseHandler.error(
      res,
      "Error retrieving admin profile",
      500,
      error
    );
  }
};

// Logout admin
const logoutAdmin = (req, res) => {
  try {
    res.clearCookie("adminToken");
    return ResponseHandler.success(res, {}, "Logged out successfully");
  } catch (error) {
    console.error("Error logging out:", error);
    return ResponseHandler.error(res, "Error during logout", 500, error);
  }
};

export { registerAdmin, loginAdmin, getAdminProfile, logoutAdmin };
