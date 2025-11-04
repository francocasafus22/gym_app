export default function EjercicioCard({ ejercicio }) {
  return (
    <div className="bg-zinc-800 text-white shadow-xl rounded-xl p-5 flex flex-col items-center justify-center gap-3 hover:scale-[1.02] transition-transform duration-300">
      <h2 className="text-xl font-bold text-center">{ejercicio.nombre}</h2>
      <div className="rounded-lg flex items-center justify-center w-50 h-50">
        <img
          src={ejercicio.ejercicio.imagen}
          alt={ejercicio.nombre}
          className="max-h-56 object-contain rounded-xl"
        />
      </div>
    </div>
  );
}
