import Role from "../models/roles.js";

export const createRole = async (req, res) => {
  try {
    if (req.user.role !== "SuperAdmin") {
      return res.status(403).json({ message: "Only SuperAdmin can create roles" });
    }

    const { name, permissions } = req.body;

    if (!name || !permissions) {
      return res.status(400).json({ message: "Name and permissions required" });
    }

    const exist = await Role.findOne({ name });
    if (exist) {
      return res.status(400).json({ message: "Role already exists" });
    }

    const role = await Role.create({ name, permissions });

    return res.status(201).json({ message: "Role created", role });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

