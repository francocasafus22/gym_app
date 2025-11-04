import { Router } from "express";
import RutinasController from "../controllers/RutinasController.js";

const router = Router();

router.get("/", RutinasController.getAll);
router.get("/:slug", RutinasController.getOneBySlug);
router.post("/", RutinasController.create);
router.post(
  "/:rutinaId/ejercicio/:ejercicioId",
  RutinasController.asignarEjercicio,
);
router.patch("/:rutinaId", RutinasController.update);
router.delete("/ejercicios", RutinasController.deleteExercise);

export default router;
