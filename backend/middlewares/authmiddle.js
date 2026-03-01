import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized - Token Missing",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - Token not found",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.userId;
    req.userRole = decoded.role;

    console.log("✅ Authenticated User:", req.user);
    console.log("✅ Role:", req.userRole);

    next();
  } catch (error) {
    console.error("JWT Error:", error.message);

    return res.status(401).json({
      message: "Invalid or Expired Token",
    });
  }
};

export default auth;
