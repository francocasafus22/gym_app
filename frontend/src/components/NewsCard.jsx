export default function NewsCard({ title, image }) {
    return (
        <article className="group bg-[#DC2626] rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-900/50">
            {/* Imagen */}
            <div className="w-full aspect-video overflow-hidden">
                <img
                    src={image || "/placeholder.svg"}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* Contenido */}
            <div className="p-6 flex flex-col items-center text-center">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 text-balance">
                    {title}
                </h3>

                {/* Botón Ver más */}
                <button className="text-white text-sm font-medium hover:underline transition-all">
                    Ver más
                </button>
            </div>
        </article>
    );
}