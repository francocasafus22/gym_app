import { Router } from "express";
import MembresiaTipoController from "../controllers/MembresiaTipoController.js";

const router = Router();

// Membresia Tipos
router.get("/", MembresiaTipoController.getAll);
router.patch("/:nombre", MembresiaTipoController.edit);

export default router;
