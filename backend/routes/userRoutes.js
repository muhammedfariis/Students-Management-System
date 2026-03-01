import express from "express";

import auth from "../middlewares/authmiddle.js";
import allowRoles from "../middlewares/userRoles.js";

import {
  creatUsers,
  getUsers,
  getUsersById,
  updateUsers,
  remove,
} from "../user-managements-2/controllers/userLogics.js";

const router = express.Router();


// Get All Users
router.get("/users", auth, allowRoles("admin", "superadmin"), getUsers);

// Get Single User
router.get(
  "/users/:id",
  auth,
  allowRoles("admin", "superadmin", "student"),
  getUsersById,
);

// Create User
router.post("/users", auth, allowRoles("admin", "superadmin"), creatUsers);

// Update User
router.put(
  "/users/:id",
  auth,
  allowRoles("admin", "superadmin", "student"),
  updateUsers,
);

// Delete User (Superadmin Only)
router.delete("/users/:id", auth, allowRoles("superadmin"), remove);

export default router;
