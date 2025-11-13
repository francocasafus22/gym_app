import { X } from "lucide-react";
import InputForm from "./ui/InputForm";

export default function EjercicioCard({
  ejercicio,
  setIsOpenDeleteEjercicio,
  canDelete,
  showSeries,
}) {
  return (
    <div className="border-border border text-white shadow-md hover:shadow-xl transition-all duration-300 rounded-xl p-5 flex flex-col items-center justify-center gap-5 relative">
      {canDelete && (
        <X
          className="absolute top-2 right-2  text-border hover:text-accent cursor-pointer transition-all duration-300"
          size={24}
          onClick={() => setIsOpenDeleteEjercicio(ejercicio._id)}
        />
      )}
      <h2 className="text-xl font-bold text-center text-secondary">
        {ejercicio.ejercicio.nombre}
      </h2>
      <div className="rounded-lg flex items-center justify-center w-full h-56">
        <img
          src={ejercicio.ejercicio.imagen}
          alt={ejercicio.nombre}
          className="max-h-56 object-contain rounded-xl"
        />
      </div>
      {showSeries && (
        <div
          className={`grid grid-cols-2 ${ejercicio.series.length == 3 && "lg:grid-cols-3"} gap-2 items-center justify-center mx-auto`}
        >
          {ejercicio.series.map((s, i) => (
            <div
              key={i}
              className="border-border border text-secondary p-5 rounded-xl shadow-md flex flex-col gap-2"
            >
              <p className="text-secondary text-xl text-center font-medium">
                Serie {i + 1}
              </p>

              <div className="text-base font-medium">
                <p className="text-sm md:text-md">
                  Peso: <span className="text-accent">{s.peso}kg</span>
                </p>
                <p className="text-sm md:text-md">
                  Repes: <span className="text-accent">{s.repeticiones}kg</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
