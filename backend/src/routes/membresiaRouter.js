import { Router } from "express";
import MembresiaController from "../controllers/MembresiaController.js";

const router = Router();

router.get("/", MembresiaController.getAll);

export default router;
