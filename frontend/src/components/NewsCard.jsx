import { Link } from "react-router-dom";

export default function NewsCard({ title, image }) {
  return (
    <article className="group bg-accent rounded-xl overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-2xl">
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
        <Link className="bg-primary text-accent rounded-xl px-5 py-2 text-sm font-bold transition-all hover:brightness-90">
          Ver más
        </Link>
      </div>
    </article>
  );
}
