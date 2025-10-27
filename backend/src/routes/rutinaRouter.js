import { Router } from "express";
import RutinasController from "../controllers/RutinasController.js";

const router = Router();

router.get("/", RutinasController.getAll);
router.post("/", RutinasController.create);
router.post("/:rutinaId/ejercicios", RutinasController.asignarEjercicio);

export default router;
