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
      type: String,
      required: true,
    },
    image:{
      type: String, 
      required: false,
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
    membresia: [
      {
        type: Types.ObjectId,
        ref: "Membresia",
      },
    ],
  },
  {
    timestamps: true,
    collection: "users",
  }
);

const User = model("User", userSchema);
export default User;
