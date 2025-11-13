import InputForm from "./ui/InputForm";
import { useState } from "react";

export default function EjercicioEntrenamientoCard({ ejercicio, onSiguiente }) {
  // Inicializar el estado de las series dependiendo la cantidad de series del ejercicio
  const [series, setSeries] = useState(
    Array.from({ length: ejercicio.series }, () => ({
      peso: 0,
      repeticiones: 0,
    })),
  );

  // Index: index de la serie
  // Campo: peso o repeticiones
  const handleSerieChange = (index, campo, value) => {
    const nuevaSerie = [...series];
    nuevaSerie[index][campo] = value;
    setSeries(nuevaSerie);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSiguiente(series);
    // Limpiar los inputs
    setSeries(
      Array.from({ length: ejercicio.series }, () => ({
        peso: 0,
        repeticiones: 0,
      })),
    );
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
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
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-center gap-5">
          {series.map((s, i) => (
            <div
              key={i}
              className="border-border border p-5 rounded-xl shadow-md flex flex-col gap-2"
            >
              <p className="text-secondary text-xl text-center font-medium">
                Serie {i + 1}
              </p>
              <InputForm
                label={`Peso`}
                type="number"
                id={`serie-${i + 1}-peso`}
                placeholder={"0 Kg"}
                required
                value={s.peso}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  // No permite que el valor sea menor a 0
                  handleSerieChange(i, "peso", value < 0 ? 0 : value);
                }}
              />
              <InputForm
                label={"Repeticiones"}
                type="number"
                id={`serie-${i + 1}-repeticiones`}
                placeholder={"0"}
                required
                value={s.repeticiones}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  // No permite que el valor sea menor a 0
                  handleSerieChange(i, "repeticiones", value < 0 ? 0 : value);
                }}
              />
            </div>
          ))}
        </div>
        <button
          className="bg-accent text-accent-foreground mt-5 flex mx-auto py-2 px-5 rounded-xl text-xl  cursor-pointer hover:bg-accent-hover transition-all duration-200"
          type="submit"
        >
          Siguiente Ejercicio
        </button>
      </form>
    </>
  );
}
