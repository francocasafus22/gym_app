import MembresiaTipo from "../models/MembresiaTipo.js";

export default class MembresiaTipoController {
  static async getAll(req, res) {
    const membresiasTipos = await MembresiaTipo.find();
    res.json(membresiasTipos);
  }

  static async edit(req, res) {
    try {
      const { nombre } = req.params;
      const { descripcion, precio } = req.body;

      const membresiaTipo = await MembresiaTipo.findOne({
        nombre,
      });

      if (membresiaTipo) {
        membresiaTipo.precio = precio;
        membresiaTipo.descripcion = descripcion;

        membresiaTipo.save();

        res.json({ message: "Membresia editada correctamente" });
      } else {
        res.status(404).json({ error: "No se encontro la membresia" });
      }
    } catch (error) {
      res.status(500).json({ error: "Hubo un error al editar" });
    }
  }
}
