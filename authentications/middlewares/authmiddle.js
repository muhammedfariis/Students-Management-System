
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

    req.user = payload.userId;
    req.userRole = payload.role;

    console.log("Auth User:", req.user);
    console.log("Role:", req.userRole);

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token", err });
  }
};

export default auth;

