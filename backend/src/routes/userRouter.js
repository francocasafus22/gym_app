import { Router } from "express";
import UserController from "../controllers/UserController.js";

const router = Router();

router.get("/", UserController.getAll);

export default router;
