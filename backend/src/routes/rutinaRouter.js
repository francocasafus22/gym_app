import { Router } from "express";
import RutinasController from "../controllers/RutinasController.js";

const router = Router();

router.get("/", RutinasController.getAll);
router.get("/one", RutinasController.getOne);
router.post("/", RutinasController.create);
router.post(
  "/:rutinaId/ejercicio/:ejercicioId",
  RutinasController.asignarEjercicio,
);
router.patch("/:rutinaId", RutinasController.update);
router.delete(
  "/:rutinaId/ejercicio/:ejercicioId",
  RutinasController.deleteExercise,
);

export default router;
