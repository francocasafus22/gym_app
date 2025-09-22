import mongoose, { Schema, model, Types } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    dni: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      enum: ["usuario", "entrenador", "administrador"],
      required: true,
      default: "usuario",
    },
    estado: {
      type: String,
      enum: ["activo", "inactivo"],
      default: "activo",
    },
    membresia: {
      type: Types.ObjectId,
      ref: "Membresia",
    },
    fechaInicioMembresia: {
      type: Date,
    },
    fechaFinMembresia: {
      type: Date,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

const User = model("User", userSchema);
export default User;
