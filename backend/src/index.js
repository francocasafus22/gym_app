import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRouter.js";
import membresiaRouter from "./routes/membresiaRouter.js";
import ventaRouter from "./routes/ventaRouter.js"
import membresiaTipoRouter from "./routes/membresiaTipoRouter.js";
import ejercicioRouter from "./routes/ejercicioRouter.js";
import rutinaRouter from "./routes/rutinaRouter.js";
import entrenamientoRouter from "./routes/entrenamientoRouter.js";
import productoRouter from "./routes/productoRouter.js"
import { updateMembresias } from "./jobs/membresiasJobs.js";
import newsRouter from "./routes/newsRouter.js";

dotenv.config();
connectDB();

updateMembresias.start();
const PORT = process.env.PORT || 3000;


const FRONTEND = process.env.FRONTEND

const corsOptions = {
  origin: function (origin, callback) {
  
    if (process.env.NODE_ENV === "dev") {
      if (!origin) return callback(null, true);
      return callback(null, true); // permitir sin origin en dev
    }

    // en producción no permite sin origin 
    if (!origin) {
      return callback(new Error("CORS bloqueado: origin vacío no permitido"));
    }

    // produccion, solo desde origin permitido
    if (FRONTEND===origin) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS bloqueado: origin no permitido " + origin));
    }
  },
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
app.use("/api/producto", productoRouter)
app.use("/api/venta", ventaRouter)
app.use("/api/rutina", rutinaRouter);
app.use("/api/entrenamiento", entrenamientoRouter);
app.use("/api/news", newsRouter);

app.use("/", (req, res) => {
  res.json({ message: "Spartan Gym" });
});

app.listen(PORT, () => {
  console.log(`Server en http://localhost:${PORT}`);
});
