import User from "../models/User.js";
import { checkPassword, hashPassword } from "../utils/auth.js";
import { createToken } from "../utils/jwt.js";
export default class UserController {
  static async getAll(req, res) {
    const users = await User.find();
    res.json(users);
  }

  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        res
          .status(404)
          .json({ message: "No existe ningun usuario con ese email" });
        return;
      }

      const isPasswordCorrect = await checkPassword(password, user.password);

      if (!isPasswordCorrect) {
        res.status(401).json({ message: "Contraseña incorrecta" });
        return;
      }

      const token = createToken({ id: user._id });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: "Error al iniciar sesión" });
    }
  }

  static async register(req, res) {
    const { email } = req.body;
    try {
      const userExist = await User.findOne({ email });

      if (userExist) {
        res.status(409).json({ error: "El email ya está registrado" });
        return;
      }

      const user = await User.create(req.body);

      user.password = await hashPassword(user.password);

      await user.save();

      res.status(201).json({ message: "Usuario creado correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
