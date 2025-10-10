import Membresia from "../models/Membresia.js";
import MembresiaTipo from "../models/MembresiaTipo.js";

export default class MembresiaController {
  static async getAll(req, res) {
    const membresias = await Membresia.find();
    res.json(membresias);
  }
}
