import Ejercicio from "../models/Ejercicio.js";
import Rutina from "../models/Rutina.js";

export default class RutinasController {
  static async getAll(req, res) {
    try {
      const rutinas = await Rutina.find();
      res.json(rutinas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Hubo un error al obtener las rutinas" });
    }
  }

  static async getOneBySlug(req, res) {
    try {
      const rutina = await Rutina.findOne(
        { slug: req.params.slug },
        "-descripcion -tipo -nivel -activa",
      ).populate("ejercicios.ejercicio");

      if (!rutina) {
        res.status(404).json({ error: "Rutina no encontrada" });
        return;
      }
      res.json(rutina);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Hubo un error al obtener la rutina" });
    }
  }

  static async create(req, res) {
    try {
      const rutinaExist = await Rutina.findOne({ nombre: req.body.nombre });

      if (rutinaExist) {
        const error = new Error("Nombre de rutina ya existente");
        res.status(400).json({ error: error.message });
        return;
      }

      const rutina = await Rutina.create(req.body);
      await rutina.save();
      res.status(201).json({ message: "Rutina creada exitosamente" });
    } catch (error) {
      res.status(500).json({ error: "Hubo un error al crear la rutina" });
    }
  }

  static async asignarEjercicio(req, res) {
    try {
      const { rutinaId, ejercicioId } = req.params;

      const rutina = await Rutina.findById(rutinaId);
      if (!rutina) {
        res.status(404).json({ error: "Rutina no encontrada" });
        return;
      }
      const ejercicioExist = await Ejercicio.findById(ejercicioId);
      if (!ejercicioExist) {
        res.status(404).json({ error: "Ejercicio no encontrado" });
        return;
      }

      const { series, repeticiones, descanso, peso, dia } = req.body;
      const ejercicioCompleto = {
        ejercicioId,
        nombre: ejercicioExist.nombre,
        series,
        repeticiones,
        descanso,
        peso: peso ?? 0,
        dia,
      };

      if (
        rutina.ejercicios.some(
          (e) =>
            e.ejercicioId.toString() === ejercicioId.toString() &&
            e.dia === dia,
        )
      ) {
        res.status(400).json({ error: "Ejercicio ya asignado en ese día" });
        return;
      }

      rutina.ejercicios.push(ejercicioCompleto);
      await rutina.save();
      res.status(200).json({ message: "Ejercicio asignado exitosamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Hubo un error al asignar la rutina" });
    }
  }

  static async update(req, res) {
    try {
      const { rutinaId } = req.params;
      const { nombre } = req.body;

      let rutina = await Rutina.findById(rutinaId);

      if (!rutina) {
        const error = new Error("Rutina no encontrada");
        res.status(404).json({ error: error.message });
        return;
      }

      const nombreExist = await Rutina.findOne({ nombre });

      if (nombreExist && nombreExist._id.toString() !== rutinaId.toString()) {
        const error = new Error("Nombre de rutina ya existente");
        res.status(400).json({ error: error.message });
        return;
      }
      rutina.set(req.body);
      await rutina.save();

      res.json({ message: "Rutina actualizada exitosamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
