import { X } from "lucide-react";

export default function EjercicioCard({
  ejercicio,
  setIsOpenDeleteEjercicio,
  canDelete,
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
        {ejercicio.nombre}
      </h2>
      <div className="rounded-lg flex items-center justify-center w-full h-56">
        <img
          src={ejercicio.ejercicio.imagen}
          alt={ejercicio.nombre}
          className="max-h-56 object-contain rounded-xl"
        />
      </div>
    </div>
  );
}
