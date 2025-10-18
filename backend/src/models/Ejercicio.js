import { Schema, model } from "mongoose";

const ejercicioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
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
      "Piernas",
      "Abdominales",
    ],
  },
  imagen: {
    type: String,
    required: true,
    maxlength: 255,
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
  collection: 'ejercicios',
});

const Ejercicio = model("Ejercicio", ejercicioSchema);

export default Ejercicio;
