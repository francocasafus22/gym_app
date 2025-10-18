import { Schema, model } from "mongoose";
import slug from "slug";

const ejercicioSchema = new Schema(
  {
    nombre: {
      type: String,
      unique: true,
      required: true,
      maxlength: 255,
    },
    nombreSlug: {
      type: String,
      unique: true,
      required: false,
      maxlength: 255,
    },
    descripcion: {
      type: String,
      required: true,
      maxlength: 255,
    },
    grupoMuscular: {
      type: String,
      required: true,
      enum: [
        "Brazos",
        "Piernas",
        "Pectoral",
        "Hombros",
        "Espalda",
        "Abdominales",
      ],
    },
    imagen: {
      type: String,
      required: true,
      maxlength: 255,
      default: "https://placehold.co/250?text=Ejercicio",
    },
    duracionMinutos: {
      type: Number,
      required: false,
      min: 0,
      max: 120,
    },
  },
  {
    timestamps: true,
    collection: "ejercicios",
  },
);

ejercicioSchema.pre("save", function (next) {
  if (!this.nombreSlug && this.nombre) {
    this.nombreSlug = slug(this.nombre, "-");
  }
  next();
});

const Ejercicio = model("Ejercicio", ejercicioSchema);

export default Ejercicio;
