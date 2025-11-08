import InputForm from "./ui/InputForm";
import { useState } from "react";

export default function EjercicioEntrenamientoCard({
  ejercicio,
  setEjercicioIndex,
}) {
  const [series, setSeries] = useState(
    Array.from({ length: ejercicio.series }, () => ""),
  );

  const handleSerieChange = (index, value) => {
    const nuevosPesos = [...series];
    nuevosPesos[index] = value;
    setSeries(nuevosPesos);
  };

  return (
    <div className=" text-white p-5 flex flex-col items-center justify-center gap-5">
      <div className="md:w-1/2">
        <h2 className="text-2xl font-bold mb-5 text-center text-secondary">
          {ejercicio.nombre}
        </h2>
        <div className="rounded-lg flex items-center justify-center w-full">
          <img
            src={ejercicio.ejercicio.imagen}
            alt={ejercicio.nombre}
            className="max-h-80 object-contain rounded-xl"
          />
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(series);
          setEjercicioIndex((prev) => prev + 1);
        }}
        className="flex flex-col gap-5 md:w-sm"
      >
        {Array.from({ length: ejercicio.series }, (_, i) => (
          <InputForm
            label={`Serie ${i + 1}`}
            type="number"
            id={`serie-${i + 1}`}
            placeholder={"0 Kg"}
            required
            value={series[i]}
            onChange={(e) => handleSerieChange(i, e.target.value)}
          />
        ))}
        <button
          className="bg-accent mt-5 flex mx-auto py-2 px-5 rounded-xl text-xl font-medium cursor-pointer hover:bg-accent-hover transition-all duration-200"
          type="submit"
        >
          Siguiente Ejercicio
        </button>
      </form>
    </div>
  );
}
