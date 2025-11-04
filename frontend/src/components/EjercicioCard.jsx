import { X } from "lucide-react";

export default function EjercicioCard({ ejercicio }) {
  return (
    <div className="bg-zinc-800 text-white shadow-xl rounded-xl p-5 flex flex-col items-center justify-center gap-5 relative">
      <X
        className="absolute top-2 right-2  text-border hover:text-accent cursor-pointer transition-all duration-300"
        size={24}
      />
      <h2 className="text-xl font-bold text-center">{ejercicio.nombre}</h2>
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
