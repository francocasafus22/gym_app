import { Schema, model, Types } from "mongoose";

const entrenamientoSchema = new Schema({
  rutina: {
    rutinaId: {
      type: Types.ObjectId,
      ref: "Rutina",
      required: true,
    },
    nombre: String,
  },
  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
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
        type: Types.ObjectId,
        ref: "Ejercicio",
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
