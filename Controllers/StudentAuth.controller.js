import StudentAuth from "../Models/StudentAuth.model.js";
import ResponseHandler from "../Utils/ResponseHandler.js";
import jwt from "jsonwebtoken";

// Register new student
const registerStudent = async (req, res) => {
  try {
    const { name, email, enrollmentNumber, password } = req.body;

    // Validate required fields
    if (!name || !email || !enrollmentNumber || !password) {
      return ResponseHandler.error(
        res,
        "Email, enrollment number, and password are required",
        400
      );
    }

    // Check if email already exists
    const existingEmail = await StudentAuth.findOne({ email });
    if (existingEmail) {
      return ResponseHandler.error(res, "Email already registered", 400);
    }

    // Check if enrollment number already exists
    const existingEnrollment = await StudentAuth.findOne({ enrollmentNumber });
    if (existingEnrollment) {
      return ResponseHandler.error(
        res,
        "Enrollment number already registered",
        400
      );
    }

    // Create new student auth record
    const newStudentAuth = new StudentAuth({
      name,
      email,
      enrollmentNumber,
      password,
    });

    // Save to database - password will be hashed by pre-save middleware
    const savedStudentAuth = await newStudentAuth.save();

    // Don't send password in response
    const studentData = {
      _id: savedStudentAuth._id,
      name: savedStudentAuth.name,
      email: savedStudentAuth.email,
      enrollmentNumber: savedStudentAuth.enrollmentNumber,
      createdAt: savedStudentAuth.createdAt,
      role: savedStudentAuth.role,
    };

    return ResponseHandler.success(
      res,
      studentData,
      "Student registered successfully",
      201
    );
  } catch (error) {
    console.error("Error registering student:", error);
    return ResponseHandler.error(res, "Error registering student", 500, error);
  }
};

// Login student
const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return ResponseHandler.error(res, "Email and password are required", 400);
    }

    // Find student by email
    const student = await StudentAuth.findOne({ email });
    if (!student) {
      return ResponseHandler.error(res, "Invalid credentials", 401);
    }

    // Compare passwords
    const isPasswordMatch = await student.comparePassword(password);
    if (!isPasswordMatch) {
      return ResponseHandler.error(res, "Invalid credentials", 401);
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: student._id, email: student.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1d" }
    );

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return ResponseHandler.success(
      res,
      {
        _id: student._id,
        email: student.email,
        name: student.name,
        enrollmentNumber: student.enrollmentNumber,
        role: student.role,
        createdAt: student.createdAt,
        isBooked: student.isBooked,
      },
      "Login successful"
    );
  } catch (error) {
    console.error("Error logging in:", error);
    return ResponseHandler.error(res, "Error during login", 500, error);
  }
};

// Get student profile
const getStudentProfile = async (req, res) => {
  try {
    const studentId = req.studentId; // Will be set by auth middleware

    const student = await StudentAuth.findById(studentId)
      .select("-password")
      .populate("student");

    if (!student) {
      return ResponseHandler.error(res, "Student not found", 404);
    }

    return ResponseHandler.success(
      res,
      student,
      "Student profile retrieved successfully"
    );
  } catch (error) {
    console.error("Error retrieving student profile:", error);
    return ResponseHandler.error(
      res,
      "Error retrieving student profile",
      500,
      error
    );
  }
};

// Logout student
const logoutStudent = (req, res) => {
  try {
    res.clearCookie("token");
    return ResponseHandler.success(res, {}, "Logged out successfully");
  } catch (error) {
    console.error("Error logging out:", error);
    return ResponseHandler.error(res, "Error during logout", 500, error);
  }
};

export { registerStudent, loginStudent, getStudentProfile, logoutStudent };
