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
}

