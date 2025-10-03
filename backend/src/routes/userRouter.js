import { Router } from "express";
import UserController from "../controllers/UserController.js";

const router = Router();

router.get("/", UserController.getAll);
router.post("/login", UserController.login);
router.post("/register", UserController.register);

export default router;
