import { Router } from "express";
import UserController from "../controllers/UserController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { body } from "express-validator";
import handleErrorsMiddleware from "../middlewares/handleErrorsMiddleware.js";

const router = Router();

router.get("/", UserController.getAll);

router.post(
  "/login",
  body("email").isEmail().withMessage("El email no es valido"),
  body("password").notEmpty().withMessage("El password no puede estar vacio"),
  handleErrorsMiddleware,
  UserController.login,
);
router.post(
  "/register",
  body("email").isEmail().withMessage("El email no es valido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("El password debe tener al menos 6 caracteres"),
  body("firstName").notEmpty().withMessage("El nombre es obligatorio"),
  body("lastName").notEmpty().withMessage("El apellido es obligatorio"),
  body("dni")
    .notEmpty()
    .withMessage("El DNI es obligatorio")
    .isLength({ min: 8 })
    .withMessage("El DNI debe tener al menos 8 caracteres")
    .isNumeric()
    .withMessage("El DNI debe contener solo números"),

  handleErrorsMiddleware,
  UserController.register,
);
router.get("/me", authMiddleware, UserController.getUser);

router.post("/asignar-membresia", UserController.asignarMembresia);

router.post("/asignar-rutina", UserController.asignarRutina);

router.get(
  "/entrenamientos",
  authMiddleware,
  UserController.getAllEntrenamientos,
);

export default router;
