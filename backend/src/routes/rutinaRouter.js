import { Router } from "express";
import RutinasController from "../controllers/RutinasController.js";

const router = Router();

router.get("/", RutinasController.getAll);
router.post("/", RutinasController.create);
router.post(
  "/:rutinaId/ejercicio/:ejercicioId",
  RutinasController.asignarEjercicio,
);
router.patch("/:rutinaId", RutinasController.update);

export default router;
