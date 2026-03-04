import express from "express";

import auth from "../middlewares/authmiddle.js";

import {
  register,login,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);


export default router;