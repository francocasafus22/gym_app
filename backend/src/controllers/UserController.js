import MembresiaTipo from "../models/MembresiaTipo.js";
import User from "../models/User.js";
import { checkPassword, hashPassword } from "../utils/auth.js";
import { createToken } from "../utils/jwt.js";
import Membresia from "../models/Membresia.js";
export default class UserController {
  static async getAll(req, res) {
    try {
      // q es la busqueda
      const { page = 1, q = "" } = req.query;

      const limit = 10;
      const skip = (Number(page) - 1) * limit;

      // Contenga la busqueda en firstName, lastName o dni y sean usuarios
      const query = {
        rol: "usuario",
        ...(q
          ? {
              $or: [
                { firstName: { $regex: q, $options: "i" } },
                { lastName: { $regex: q, $options: "i" } },
                { dni: { $regex: q, $options: "i" } },
              ],
            }
          : {}),
      };

      // Obtener los usuarios filtrados y con el estado y vencimiento de su ultima membresia
      const users = await User.find(query, "-password  -__v")
        .skip(skip)
        .limit(limit)
        .sort({ updatedAt: -1 })
        .populate({
          path: "membresia",
          select: "tipo fechaFin estado -_id",
          populate: { path: "tipo", select: "nombre -_id" },
        });
      const total = await User.countDocuments(query);

      res.json({
        users,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: Number(page),
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        const error = new Error("No existe ningun usuario con ese email");
        res.status(404).json({ error: error.message });
        return;
      }

      const isPasswordCorrect = await checkPassword(password, user.password);

      if (!isPasswordCorrect) {
        const error = new Error("Contraseña incorrecta");
        res.status(401).json({ error: error.message });
        return;
      }

      const token = createToken({ id: user._id });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: "Error al iniciar sesión" });
    }
  }

  static async asignarMembresia(req, res) {
    try {
      const { userId, membresiaId } = req.body;

      const user = await User.findById(userId).populate({
        path: "membresia",
        select: "estado",
        options: { sort: { fechaInicio: -1 }, limit: 1 },
      });
      if (!user) {
        const error = new Error("No existe el usuario con ese id");
        res.status(404).json({ error: error.message });
        return;
      }

      const tipoMembresia = await MembresiaTipo.findById(membresiaId);
      if (!tipoMembresia) {
        const error = new Error("No existe ese tipo de membresia");
        res.status(404).json({ error: error.message });
        return;
      }

      // Si su ultima membresia tiene el estado en pago no te dejará asignarle una nueva membresia
      if (user.membresia[0]?.estado == true) {
        const error = new Error("El usuario ya tiene una membresia activa");
        res.status(401).json({ error: error.message });
        return;
      }

      const fechaInicio = new Date();
      const fechaFin = new Date(fechaInicio);
      fechaFin.setDate(fechaFin.getDate() + tipoMembresia.duracionDias);

      const nuevaMembresia = await Membresia.create({
        tipoMembresiaId: tipoMembresia._id,
        userId: user._id,
        estado: true,
        fechaInicio,
        fechaFin,
        tipo: tipoMembresia._id,
      });

      user.membresia.push(nuevaMembresia._id);
      await user.save();
      res.json({ message: "Membresia asignada correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async register(req, res) {
    const { email, dni } = req.body;
    try {
      const userExist = await User.findOne({ $or: [{ email }, { dni }] });

      if (userExist) {
        if (userExist.email === email) {
          res.status(409).json({ error: "El email ya está registrado" });
          return;
        } else {
          res.status(409).json({ error: "El dni ya está registrado" });
          return;
        }
      }

      const user = await User.create(req.body);

      user.password = await hashPassword(user.password);

      await user.save();

      res.status(201).json({ message: "Usuario creado correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUser(req, res) {
    try {
      const user = await User.findById(req.user.id)
        .select("-password -_id")
        .populate("membresia");

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  }
}
