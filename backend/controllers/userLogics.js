import Users from "../models/auth.js";
import Role from "../models/Role.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// ========================================
// CREATE USER (ADMIN + SUPERADMIN)
// ========================================

export const createUser = async (req, res) => {
  try {
    const { email, password, firstname, lastname, roleId } = req.body;

    // ================= RBAC =================

    if (req.user.role !== "Admin" && req.user.role !== "SuperAdmin") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    // ================= VALIDATION =================

    if (!email || !password || !firstname || !roleId) {
      return res.status(400).json({
        message: "Required fields missing",
      });
    }

    // ================= EXIST CHECK =================

    const exist = await Users.findOne({ email });

    if (exist) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // ================= ROLE VERIFY =================

    const role = await Role.findById(roleId);

    if (!role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }

    // ADMIN CANNOT CREATE ADMIN

    if (req.user.role === "Admin" && role.name === "Admin") {
      return res.status(403).json({
        message: "Admin cannot create Admin",
      });
    }

    // ================= PASSWORD HASH =================

    const hash = await bcrypt.hash(password, 10);

    // ================= CREATE =================

    const user = await Users.create({
      email,
      password: hash,
      firstname,
      lastname,
      role: role._id,
    });

    // ================= TOKEN =================

    const token = jwt.sign(
      {
        userId: user._id,
        role: role.name,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "12h",
      },
    );

    return res.status(201).json({
      message: "User Created Successfully",

      token,

      user: {
        id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: role.name,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",

      error: err.message,
    });
  }
};

// ========================================
// GET ALL USERS
// ========================================

export const getUsers = async (req, res) => {
  try {
    const users = await Users.find()

      .populate("role", "name permissions");

    if (!users.length) {
      return res.status(404).json({
        message: "Users not found",
      });
    }

    return res.status(200).json({
      message: "Users fetched",

      users,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

// ========================================
// GET USER BY ID
// ========================================

export const getUserById = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id)

      .populate("role", "name permissions");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User found",

      user,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

// ========================================
// UPDATE USER
// ========================================

export const updateUser = async (req, res) => {
  try {
    const updates = { ...req.body };

    // PASSWORD OPTIONAL

    if (req.body.password) {
      updates.password = await bcrypt.hash(
        req.body.password,

        10,
      );
    }

    // ROLE UPDATE IF PROVIDED

    if (req.body.roleId) {
      const role = await Role.findById(req.body.roleId);

      if (!role) {
        return res.status(404).json({
          message: "Role not found",
        });
      }

      updates.role = role._id;
    }

    const updatedUser = await Users.findByIdAndUpdate(
      req.params.id,

      updates,

      { new: true },
    )

      .populate("role", "name permissions");

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not updated",
      });
    }

    return res.status(200).json({
      message: "User Updated",

      updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

// ========================================
// DELETE USER (SUPERADMIN ONLY)
// ========================================

export const deleteUser = async (req, res) => {
  try {
    if (req.user.role !== "SuperAdmin") {
      return res.status(403).json({
        message: "Only SuperAdmin can delete users",
      });
    }

    const deleted = await Users.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User Deleted",

      deleted,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
