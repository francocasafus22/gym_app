import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function authMiddleware(req, res, next) {
  try {
    const bearer = req.headers?.authorization;
    if (!bearer) {
      const error = new Error("No estás autorizado");
      res.status(401).json({ error: error.message });
    }

    const token = bearer.split(" ")[1];

    if (!token) {
      const error = new Error("Token no válido");
      res.status(401).json({ error: error.message });
    }

    const result = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof result === "object" && result.id) {
      req.user = await User.findById(result.id).select("-password");
      if (!req.user) {
        res.status(404).json({ error: "Usuario no encontrado" });
        return;
      }
      next();
    }
  } catch (e) {
    const error = new Error("Token no válido");
    res.status(401).json({ error: error.message });
  }
}
