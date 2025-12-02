import express from "express";
import { getNewsItems, createNewsItem } from "../controllers/newsController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getNewsItems);


router.post(
  "/",
  authMiddleware, 
  (req, res, next) => {
    if (!req.user || req.user.rol !== "administrador") {
      return res.status(403).json({ message: "Solo administradores" });
    }
    next();
  },
  createNewsItem
);

export default router;