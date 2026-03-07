const allowRoles = (...roles) => {
  return (req, res, next) => {
    console.log("User role from token:", req.user.role);
    console.log("User id from token:", req.user.id);
    console.log("Requested id:", req.params.id);

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "403 Forbidden: role not allowed",
      });
    }

    next();
  };
};

export default allowRoles;