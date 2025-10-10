import { model, Schema } from "mongoose";

const membresiaSchema = new Schema(
  {
    tipo: {
      type: Schema.Types.ObjectId,
      ref: "MembresiaTipo",
    },
    fechaInicio: {
      type: Date,
    },
    fechaFin: {
      type: Date,
    },
    estado: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "membresias",
  }
);

const Membresia = model("Membresia", membresiaSchema);

export default Membresia;
