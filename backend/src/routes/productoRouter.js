import { Router } from "express";
import ProductoController from "../controllers/ProductoController.js";
import { body } from "express-validator";
import handleErrorsMiddleware from "../middlewares/handleErrorsMiddleware.js";

const router = Router()

router.get("/", ProductoController.getAll);

router.post("/", 
    body("nombre").notEmpty().withMessage("El nombre es obligatorio").isString().withMessage("El nombre debe ser texto").isLength({max: 255}).withMessage("El nombre no puede superar los 255 carácteres"),
    body("precio").notEmpty().withMessage("El precio es obligatorio").isNumeric().withMessage("El precio debe ser un número").custom(value=>value>=1).withMessage("El precio debe ser mayor o igual a 1"),
    body("precioCosto").notEmpty().withMessage("El precio costo es obligatorio")
        .isNumeric().withMessage("El precio costo debe ser un número")
        .custom(value => value >= 1).withMessage("El precio costo debe ser mayor o igual a 1"),
    body("stock").notEmpty().withMessage("El stock es obligatorio")
        .isNumeric().withMessage("El stock debe ser un número")
        .custom(value => value >= 0).withMessage("El stock no puede ser negativo"),
    body("categoria")
        .notEmpty().withMessage("La categoría es obligatoria")
        .isIn(["Bebidas", "Snacks", "Suplementos", "Accesorios", "Indumentaria"])
        .withMessage("Categoría inválida")
    ,handleErrorsMiddleware,ProductoController.create);

export default router