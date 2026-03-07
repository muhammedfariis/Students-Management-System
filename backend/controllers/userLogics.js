import Users from "../models/register.js";
import Role from "../models/roles.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    console.log("Role:", req.user.role);


    if (!["Admin", "SuperAdmin"].includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied",
      });
    }


    if (!username || !email || !password || !role) {
      return res.status(400).json({
        message: "Required fields missing",
      });
    }


    const exist = await Users.findOne({ email });

    if (exist) {
      return res.status(400).json({
        message: "User already exists",
      });
    }



    const roleData = await Role.findOne({ name: role });

    if (!roleData) {
      return res.status(404).json({
        message: "Role not found",
      });
    }


    if (req.user.role === "Admin" && roleData.name === "Admin") {
      return res.status(403).json({
        message: "Admin cannot create another Admin",
      });
    }


    const hashed = await bcrypt.hash(password, 10);


    const user = await Users.create({
      username,
      email,
      password: hashed,
      role: roleData._id,
    });


    const token = jwt.sign(
      {
        userId: user._id,
        role: roleData.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.status(201).json({
      message: "User created successfully",
      user,
      token,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


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



export const updateUser = async (req, res) => {
  try {
    const updates = { ...req.body };


    if (req.body.password) {
      updates.password = await bcrypt.hash(req.body.password, 10);
    }


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
