import express from "express";
import { createAction } from "../controllers/action.js";
import verifyToken from "../middlewares/authmiddle.js";

const router = express.Router();

router.post("/create", verifyToken, createAction);

export default router;