import express from "express";
import isLogin from "../Middlewares/isLogin.js";
import isAdmin from "../Middlewares/isAdmin.js";
import {
  createComplaine,
  deleteComplaine,
  getAllComplaine,
  getStudentComplaine,
  updateComplaine,
} from "../Controllers/StudentComplaine.controller.js";

const router = express.Router();

router.post("/create", isLogin, createComplaine);
router.get("/all", isLogin, getStudentComplaine);
router.get("/all-student", isAdmin, getAllComplaine);
router.put("/update/:id", isLogin, updateComplaine);
router.delete("/delete/:id", isLogin, deleteComplaine);

export default router;
