import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function authMiddleware(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    try {
      const result = jwt.verify(token, process.env.JWT_SECRET);
      if (typeof result === "object" && result.id) {
        const user = await User.findById(result.id).select("-password");
        if (!user)
          return res.status(404).json({ error: "El usuario no existe" });
        req.user = user;
      }
    } catch {
      res.status(401).json({ error: "Token no válido" });
    }
  }
  next();
}
