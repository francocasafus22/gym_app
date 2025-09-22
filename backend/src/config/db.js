import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Base de datos conectada...");
  } catch (error) {
    console.log("Error al conectar a la BD: " + error.message);
  }
};
