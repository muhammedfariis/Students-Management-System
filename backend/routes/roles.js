import express from "express";
import { createRole } from "../controllers/roles.js";
import auth from "../middlewares/authmiddle.js";

const router = express.Router();

router.post("/", auth , createRole);  // POST   /api/roles

export default router;