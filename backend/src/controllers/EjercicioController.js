import Ejercicio from "../models/Ejercicio.js";

export default class EjercicioController {
  static async create(req, res) {
    try {
      const { nombre } = req.body;

      const ejercicioExist = await Ejercicio.findOne({ nombre });

      if (ejercicioExist) {
        return res.status(400).json({ error: "El ejercicio ya existe" });
      }

      const ejercicio = await Ejercicio.create(req.body);

      await ejercicio.save();

      res.status(201).json({ message: "Ejercicio creado exitosamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Hubo un error" });
    }
  }
  static async getAll(req, res) {
    try {
      const ejercicios = await Ejercicio.find();

      res.status(200).json(ejercicios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Hubo un error" });
    }
  }

  static async getByName(req, res) {
    try {
      const { q = "", page = 1 } = req.query;

      const limit = 4;
      const skip = (Number(page) - 1) * limit;

      const ejercicios = await Ejercicio.find(
        { nombre: { $regex: q, $options: "i" } },
        { _id: 1, nombre: 1 }, // proyección explícita
      )
        .skip(skip)
        .limit(limit);

      const total = await Ejercicio.countDocuments({
        nombre: { $regex: q, $options: "i" },
      });

      if (!ejercicios || ejercicios.length === 0) {
        return res.status(404).json({ error: "Ejercicio no encontrado" });
      }

      res.status(200).json({
        ejercicios,
        total,
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Hubo un error" });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;

      const ejercicio = await Ejercicio.findById(id);

      if (!ejercicio) {
        return res.status(404).json({ error: "Ejercicio no encontrado" });
      }

      res.status(200).json(ejercicio);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Hubo un error" });
    }
  }
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { nombre } = req.body;

      const ejercicioExist = await Ejercicio.findOne({ nombre });

      // Si el ejercicio existe y no es el mismo que se está modificando, devolver un error
      if (ejercicioExist && ejercicioExist._id.toString() !== id) {
        return res.status(400).json({ error: "El ejercicio ya existe" });
      }

      let ejercicio = await Ejercicio.findById(id);

      if (!ejercicio) {
        return res.status(404).json({ error: "Ejercicio no encontrado" });
      }

      Object.assign(ejercicio, req.body);

      await ejercicio.save();

      res.status(200).json({ message: "Ejercicio actualizado exitosamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Hubo un error" });
    }
  }
  static async delete(req, res) {
    try {
      const { id } = req.params;

      const ejercicio = await Ejercicio.findById(id);

      if (!ejercicio) {
        return res.status(404).json({ error: "Ejercicio no encontrado" });
      }

      await ejercicio.deleteOne();

      res.status(200).json({ message: "Ejercicio eliminado exitosamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Hubo un error" });
    }
  }
}
