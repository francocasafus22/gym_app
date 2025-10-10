import { model, Schema } from "mongoose";

const membresiaTipoScheme = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    duracionDias: {
      type: Number,
      enum: [30, 90, 365],
      required: true,
    },
    descripcion: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    collection: "membresiasTipos",
  }
);

const MembresiaTipo = model("MembresiaTipo", membresiaTipoScheme);
export default MembresiaTipo;
