import { Schema, model } from "mongoose";

const RutinaSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
      maxlength: 255,
    },
    tipo:{
      type: String,
      required: true,
      enum: ["Plantilla", "Personalizada"]
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
        ejercicioId: {
          type: Schema.Types.ObjectId,
          ref: "Ejercicio",
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
          required: true,
          min: 0,
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

const Rutina = model("Rutina", RutinaSchema);

export default Rutina;
