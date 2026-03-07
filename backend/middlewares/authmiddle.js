import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const headers = req.headers.authorization;

  if (!headers) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = headers.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ADD THIS - log decoded to see exact payload shape
    console.log("Decoded token payload:", decoded);

    req.user = {
       id: decoded.userId ?? decoded.user,
      role: decoded.role,
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;