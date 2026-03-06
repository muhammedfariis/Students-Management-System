import express from "express";

import auth from "../middlewares/authmiddle.js";
import allowRoles from "../middlewares/userRoles.js";

import {
  getUserById,
  getUsers,
  deleteUser,
  createUser,
  updateUser,
} from "../controllers/userLogics.js";

const router = express.Router();

router.get("/users", auth, allowRoles("Admin", "SuperAdmin"), getUsers);

router.get(
  "/users/:id",
  auth,
  allowRoles("Admin", "SuperAdmin", "student" ),
  getUserById,
);

router.post("/users", auth, allowRoles("Admin", "SuperAdmin"), createUser);

router.put(
  "/users/:id",
  auth,
  allowRoles("Admin", "SuperAdmin", "student"),
  updateUser,
);

router.delete("/users/:id", auth, allowRoles("SuperAdmin"), deleteUser);

export default router;
