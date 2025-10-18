import { Router } from "express";
import EjercicioController from "../controllers/EjercicioController.js";

const router = Router();

router.post("/", EjercicioController.create);
router.get("/", EjercicioController.getAll);
router.patch("/:id", EjercicioController.update);
router.get("/:id", EjercicioController.getById);
router.delete("/:id", EjercicioController.delete);

export default router;
