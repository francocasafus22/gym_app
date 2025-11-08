import { Router } from "express";
import EntrenamientoController from "../controllers/EntrenamientoController.js";

const router = Router();

router.get("/", EntrenamientoController.getAll);

export default router;
