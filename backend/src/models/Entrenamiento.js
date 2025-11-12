import { Schema, model, Types } from "mongoose";

const entrenamientoSchema = new Schema({
  rutina: {
    rutinaId: {
      type: Types.ObjectId,
      ref: "Rutina",
    },
    nombre: String,
  },
  duracion: {
    type: Number,
    required: true,
    default: 0,
  },
  fecha: {
    type: Date,
    required: true,
    default: Date.now,
  },
  pesos_ejercicios: [
    {
      ejercicio: {
        ejercicioId: {
          type: Types.ObjectId,
          ref: "Ejercicio",
        },
        nombre: {
          type: String,
          required: true,
          default: "",
        },
      },
      series: [
        {
          peso: Number,
          repeticiones: Number,
        },
      ],
    },
  ],
});

const Entrenamiento = model("Entrenamiento", entrenamientoSchema);

export default Entrenamiento;
