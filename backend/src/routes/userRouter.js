import { Router } from "express";
import UserController from "../controllers/UserController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", UserController.getAll);
router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.get("/me", authMiddleware, UserController.getUser);

export default router;
