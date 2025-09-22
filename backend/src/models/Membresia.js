import { model, Schema } from "mongoose";

const membresiaSchema = new Schema(
  {
    precio: {
      type: Number,
      required: true,
      min: 0,
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
    collection: "membresias",
  }
);

const Membresia = model("Membresia", membresiaSchema);

export default Membresia;
