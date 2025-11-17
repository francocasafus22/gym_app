import { Router } from "express";
import EntrenamientoController from "../controllers/EntrenamientoController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", EntrenamientoController.getAll);
router.post("/", authMiddleware, EntrenamientoController.create);
router.get("/me", authMiddleware, EntrenamientoController.getAllByUser);
router.get("/:id", EntrenamientoController.getById);
router.get(
  "/me/stats",
  authMiddleware,
  EntrenamientoController.estadisticasMes,
);

export default router;
