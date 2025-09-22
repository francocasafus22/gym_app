import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type"],
};

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "hola mundo" });
});

app.use(cors(corsOptions));

app.listen(PORT, () => {
  console.log(`Server en http://localhost:${PORT}`);
});
