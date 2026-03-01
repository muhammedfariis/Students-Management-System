import Register from "../models/register.js";
import Role from "../models/Role.js";

import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, phone, age, email, password } = req.body;

    // already exist ?

    const exist = await Register.findOne();

    if (exist) {
      return res
        .status(403)

        .json({
          message: "Register Closed",
        });
    }

    // create superadmin role automatically

    let role = await Role.findOne({
      name: "SuperAdmin",
    });

    if (!role) {
      role = await Role.create({
        name: "SuperAdmin",

        permissions: ["dashboard", "create-user", "create-role", "landing"],
      });
    }

    const hashed = await bcrypt.hash(
      password,

      10,
    );

    const signup = await Register.create({
      username,
      phone,
      age,
      email,
      password: hashed,

      role: role._id,
    });

    const token = JWT.sign(
      {
        user: signup._id,

        role: role.name,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "30d",
      },
    );

    res.status(201).json({
      token,
      user: signup,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Register.findOne({
      email,
    }).populate("role");

    if (!user) {
      return res
        .status(404)

        .json({
          message: "User not found",
        });
    }

    const compare = await bcrypt.compare(
      password,

      user.password,
    );

    if (!compare) {
      return res
        .status(401)

        .json({
          message: "wrong password",
        });
    }

    const token = JWT.sign(
      {
        user: user._id,

        role: user.role.name,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "12h",
      },
    );

    res.json({
      token,

      user: {
        id: user._id,
        username: user.username,
        email: user.email,

        role: user.role.name,

        permissions: user.role.permissions,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
