import { Router } from "express";
import EntrenamientoController from "../controllers/EntrenamientoController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", EntrenamientoController.getAll);
router.post("/", authMiddleware, EntrenamientoController.create);
router.get("/:id", EntrenamientoController.getById);

export default router;
