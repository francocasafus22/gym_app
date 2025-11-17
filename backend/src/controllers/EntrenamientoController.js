import Entrenamiento from "../models/Entrenamiento.js";

export default class EntrenamientoController {
  static async getAll(req, res) {
    try {
      const entrenamientos = await Entrenamiento.find();
      if (entrenamientos.length === 0) {
        const error = new Error("No se han encontrado entrenamientos");
        res.status(404).json({ error: error.message });
        return;
      }

      res.json(entrenamientos);
    } catch (error) {
      res.json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const { _id: userId } = req.user;

      const entrenamiento = await Entrenamiento.create({ ...req.body, userId });

      res.status(201).json({ message: "Entrenamiento guardado correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllByUser(req, res) {
    try {
      const { _id: userId } = req.user;

      const page = parseInt(req.query.page) || 1;
      const limit = 30;
      const skip = (page - 1) * limit;

      const entrenamientos = await Entrenamiento.find({
        userId,
      })
        .sort({ fecha: -1 })
        .skip(skip)
        .limit(limit);

      const total = await Entrenamiento.countDocuments({ userId });

      res.json({
        entrenamientos,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalEntrenamientos: total,
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const entrenamiento = await Entrenamiento.findById(id).populate({
        path: "pesos_ejercicios.ejercicio",
        select: "nombre imagen",
      });

      if (!entrenamiento) {
        const error = new Error("Entenamiento no encontrado");
        res.status(404).json({ error: error.message });
        return;
      }

      res.json(entrenamiento);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async estadisticasMes(req, res) {
    try {
      const { _id: userId } = req.user;

      // Establecer el primer dia del mes, hora 00:00 del mes actual
      const inicioMes = new Date();
      inicioMes.setDate(1);
      inicioMes.setHours(0, 0, 0, 0);

      const finMes = new Date();
      finMes.setMonth(finMes.getMonth() + 1);
      finMes.setDate(0);
      finMes.setHours(23, 59, 59, 999);

      const fecha = new Date();
      const diaSemana = fecha.getDay();

      const firstDayWeek = new Date(fecha);
      firstDayWeek.setDate(
        fecha.getDate() - (diaSemana === 0 ? 6 : diaSemana - 1),
      );
      firstDayWeek.setHours(0, 0, 0, 0);

      const entrenamientosMes = await Entrenamiento.find({
        userId,
        fecha: { $gte: inicioMes, $lte: finMes },
      });

      const entrenamientosSemana = entrenamientosMes.filter(
        (e) => e.fecha >= firstDayWeek,
      );

      res.json({
        entrenamientosMes: entrenamientosMes.length,
        entreamientosSemana: entrenamientosSemana.length,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
