import { Check, X } from "lucide-react";

export default function MembresiaCardHome({ data }) {
    const { nombre, precio, beneficios = [], destacado } = data;

    return (
        <div
            className={`rounded-2xl p-8 shadow-lg flex flex-col justify-between ${destacado ? "bg-gray-900 text-white" : "bg-white text-black"
                }`}
        >
            {destacado && (
                <div className="bg-accent text-black text-sm font-bold px-3 py-1 rounded-full w-fit mb-4">
                    Más beneficios
                </div>
            )}

            <div>
                <h3 className="text-2xl font-bold mb-2">{nombre}</h3>
                <p className="text-gray-400 mb-4">
                    {destacado ? "Plan más destacado" : ""}
                </p>

                <p className="text-3xl font-extrabold mb-1">${precio}</p>
                <p className="text-sm mb-6">
                    {destacado ? "Precio en Oferta" : "Disponible"}
                </p>

                <button className="bg-accent text-black font-semibold py-2 rounded-full w-full mb-6 hover:bg-gray-400 transition">
                    ¡Inscribite ya!
                </button>

                <ul className="space-y-2 text-sm">
                    {beneficios.map((b, i) => (
                        <li key={i} className="flex items-center gap-2">
                            {b.incluido ? (
                                <Check className="w-4 h-4 text-green-500" />
                            ) : (
                                <X className="w-4 h-4 text-gray-400" />
                            )}
                            <span className={b.incluido ? "" : "line-through text-gray-400"}>
                                {b.texto}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}