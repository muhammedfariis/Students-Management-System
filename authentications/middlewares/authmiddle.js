import jwt from "jsonwebtoken";

const auth = (req, res, next) => {

  const headers = req.headers.authorization;

  if (!headers) {
    return res.status(401).json({ message: "Unauthorized - No Token Provided" });
  }

  const token = headers.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "Token not available" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload.user;
    req.userRole = payload.role;  // ✅ here role comes from token
    console.log("Middleware Role:", req.userRole);

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token", err });
  }
};

export default auth;
