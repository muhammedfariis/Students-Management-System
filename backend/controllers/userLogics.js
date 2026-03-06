import Users from "../models/register.js";
import Role from "../models/roles.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// ========================================
// CREATE USER (ADMIN + SUPERADMIN)
// ========================================

export const createUser = async (req, res) => {
  try {
    const { username, email, password, roleId } = req.body;

    // RBAC CHECK

 if (!["Admin", "SuperAdmin"].includes(req.user.role)) {
  return res.status(403).json({
    message: "Access denied",
  });
}

    // VALIDATION

    if (!username || !email || !password || !roleId) {
      return res.status(400).json({
        message: "Required fields missing",
      });
    }

    // CHECK EXIST

    const exist = await Users.findOne({ email });

    if (exist) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // ROLE CHECK

    const role = await Role.findById(roleId);

    if (!role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }

    // ADMIN CANNOT CREATE ADMIN

    if (req.user.role === "Admin" || role.name === "Admin") {
      return res.status(403).json({
        message: "Admin cannot create Admin",
      });
    }

    // HASH PASSWORD

    const hashed = await bcrypt.hash(password, 10);

    // CREATE USER

    const user = await Users.create({
      username,
      email,
      password: hashed,
      role: role._id,
    });

    // TOKEN

    const token = jwt.sign(
      {
        userId: user._id,
        role: role.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "12h" },
    );

    return res.status(201).json({
      message: "User created successfully",
      token,
      user,
    });
  } catch (err) {
    console.error(err);

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
    const users = await Users.find().populate("role", "name permissions");

    if (!users.length) {
      return res.status(404).json({
        message: "Users not found",
      });
    }

    return res.status(200).json({
      message: "Users fetched successfully",
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
    const user = await Users.findById(req.params.id).populate(
      "role",
      "name permissions",
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User fetched",
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

    // HASH PASSWORD IF UPDATED

    if (req.body.password) {
      updates.password = await bcrypt.hash(req.body.password, 10);
    }

    // ROLE UPDATE

    if (req.body.roleId) {
      const role = await Role.findById(req.body.roleId);

      if (!role) {
        return res.status(404).json({
          message: "Role not found",
        });
      }

      updates.role = role._id;

      delete updates.roleId;
    }

    const updatedUser = await Users.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    }).populate("role", "name permissions");

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User updated",
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
      message: "User deleted successfully",
      deleted,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
