import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRouter.js";
import membresiaRouter from "./routes/membresiaRouter.js";
import membresiaTipoRouter from "./routes/membresiaTipoRouter.js";
import ejercicioRouter from "./routes/ejercicioRouter.js";
import rutinaRouter from "./routes/rutinaRouter.js";
import entrenamientoRouter from "./routes/entrenamientoRouter.js";
import { updateMembresias } from "./jobs/membresiasJobs.js";

dotenv.config();
connectDB();

updateMembresias.start();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/membresia", membresiaRouter);
app.use("/api/membresiaTipo", membresiaTipoRouter);
app.use("/api/ejercicio", ejercicioRouter);
app.use("/api/rutina", rutinaRouter);
app.use("/api/entrenamiento", entrenamientoRouter);
app.use("/", (req, res) => {
  res.json({ message: "Spartan Gym" });
});

app.listen(PORT, () => {
  console.log(`Server en http://localhost:${PORT}`);
});
