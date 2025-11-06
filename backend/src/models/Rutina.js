import { Schema, model } from "mongoose";
import slug from "slug";

const RutinaSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    descripcion: {
      type: String,
      required: true,
      maxlength: 255,
    },
    tipo: {
      type: String,
      required: true,
      enum: ["Plantilla", "Personalizada"],
    },
    nivel: {
      type: String,
      required: true,
      enum: ["Principiante", "Intermedio", "Avanzado"],
    },
    diasPorSemana: {
      type: Number,
      required: true,
      min: 1,
      max: 7,
    },
    ejercicios: [
      {
        ejercicio: {
          type: Schema.Types.ObjectId,
          ref: "Ejercicio",
          required: true,
        },
        nombre: {
          type: String,
          required: true,
        },
        series: {
          type: Number,
          required: true,
          min: 1,
          max: 10,
        },
        repeticiones: {
          type: Number,
          required: true,
          min: 1,
          max: 100,
        },
        descanso: {
          type: Number,
          required: true,
          min: 0,
          max: 60,
        },
        peso: {
          type: Number,
          required: false,
          min: 0,
          default: 0,
          max: 1000,
        },
        dia: {
          type: Number,
          required: true,
          min: 1,
          max: 7,
        },
      },
    ],
    activa: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "rutinas",
  },
);

RutinaSchema.pre("save", function (next) {
  this.slug = slug(this.nombre, { lower: true });
  next();
});

const Rutina = model("Rutina", RutinaSchema);

export default Rutina;
