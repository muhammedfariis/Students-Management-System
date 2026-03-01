import express from "express";

import auth from "../middlewares/authmiddle.js";

import {
  register,
  login,
  getauth,
} from "../authentication/controllers/auth.js";

const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Current Logged User
router.get("/me", auth, getauth);

export default router;