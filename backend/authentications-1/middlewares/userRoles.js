
const allowRoles = (...roles) => {
  return (req, res, next) => {
    console.log("User role from token:", req.userRole);
    console.log("User id from token:", req.user);
    console.log("Requested id:", req.params.id);

    if (!roles.includes(req.userRole)) {
      return res.status(403).json({ messege: "403 Forbidden: role not allowed" });
    }

    if (req.userRole === "student" && req.user !== req.params.id) {
      return res.status(403).json({ messege: "403 Forbidden: not your own profile" });
    }

    next();
  };
};

export default allowRoles;
