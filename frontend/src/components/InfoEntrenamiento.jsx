import { Car } from "lucide-react";
import { cronometro } from "../utils/formatText";
import { Link } from "react-router-dom";

export default function InfoEntrenamiento({ entrenamiento }) {
  const pesoTotal = entrenamiento.pesos_ejercicios.reduce(
    (total, ejercicio) => {
      const pesoEjercicio = ejercicio.series.reduce(
        (suma, serie) => suma + serie.peso * serie.repeticiones,
        0,
      );
      return total + pesoEjercicio;
    },
    0,
  );

  const seriesTotales = entrenamiento.pesos_ejercicios.reduce(
    (total, ejercicio) => {
      return total + ejercicio.series.length;
    },
    0,
  );

  const totalEjercicios = entrenamiento.pesos_ejercicios.length;

  const CardInfo = ({ label, span }) => (
    <div className="border border-border rounded-xl px-5 h-25 flex items-center justify-center shadow-md">
      <p className="text-center text-2xl md:text-3xl font-bold">
        {label}: <span className="text-accent">{span}</span>
      </p>
    </div>
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        <CardInfo
          label={"Duración"}
          span={cronometro(entrenamiento.duracion)}
        ></CardInfo>
        <CardInfo label={"Peso levantado"} span={pesoTotal + "kg"}></CardInfo>
        <CardInfo label={"Series Hechas"} span={seriesTotales} />
        <CardInfo label={"Ejercicios Hechos"} span={totalEjercicios} />
      </div>
    </>
  );
}
