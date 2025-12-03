import {Router} from "express"
import VentaController from "../controllers/VentaController.js"

const router = Router()

router.get("/", VentaController.getAll);
router.post("/", VentaController.create)

export default router