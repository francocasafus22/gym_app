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
      const entrenamiento = await Entrenamiento.create(req.body);
      const user = req.user;
      user.entrenamientos.push(entrenamiento._id);
      await user.save();

      res.status(201).json({ message: "Entrenamiento guardado correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
