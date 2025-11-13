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

  return (
    <>
      <p className="text-center text-2xl text-accent font-bold">
        ¡ Terminaste !
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        <div className="border border-border rounded-xl px-5 h-25 flex items-center justify-center shadow-md">
          <p className="text-center text-xl font-bold">
            Tiempo:{" "}
            <span className="text-accent">
              {cronometro(entrenamiento.duracion)}
            </span>
          </p>
        </div>
        <div className="border border-border rounded-xl px-5 h-25 flex items-center justify-center shadow-md">
          <p className="text-center text-xl font-bold">
            Peso levantado: <span className="text-accent">{pesoTotal} kg</span>
          </p>
        </div>
        <div className="border border-border rounded-xl px-5 h-25 flex items-center justify-center shadow-md">
          <p className="text-center text-xl font-bold">
            Series hechas: <span className="text-accent">{seriesTotales}</span>
          </p>
        </div>
        <div className="border border-border rounded-xl px-5 h-25 flex items-center justify-center shadow-md">
          <p className="text-center text-xl font-bold">
            Ejercicios hechos:{" "}
            <span className="text-accent">{totalEjercicios}</span>
          </p>
        </div>
      </div>
      <Link
        className="bg-accent text-accent-foreground text-center py-3 px-5 font-bold rounded-xl hover:bg-accent-hover cursor-pointer shadow-md hover:shadow-lg transition-all duration-200"
        to={"/mis-entrenamientos"}
      >
        Ver mis entrenamientos
      </Link>
    </>
  );
}
