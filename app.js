import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import ResponseHandler from "./Utils/ResponseHandler.js";
import studentRoutes from "./Routes/Student.route.js";
import studentComplaineRoutes from "./Routes/StudentComplaine.route.js";
import studentAuthRoutes from "./Routes/StudentAuth.route.js";
import adminAuthRoutes from "./Routes/AdminAuth.route.js";

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
console.log("Loaded FRONTEND_URL:", process.env.FRONTEND_URL);

app.get("/api/v1", (req, res) => {
  res.send("Hello World!");
});

// Student routes
app.use("/api/v1/students", studentRoutes);

// Student authentication routes
app.use("/api/v1/auth/student", studentAuthRoutes);
// Student complaine routes
app.use("/api/v1/auth/student/complaine", studentComplaineRoutes);

// Admin authentication routes
app.use("/api/v1/auth/admin", adminAuthRoutes);

app.use((req, res) => {
  return ResponseHandler.error(res, "Page Not Found", 404, {});
  // return res.send("Error");
});

app.use((err, req, res, next) => {
  return ResponseHandler.error(
    res,
    err.message || "Internal Server Error",
    err.statusCode || 500,
    err
  );
});
export default app;
