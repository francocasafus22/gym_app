"use client"
export default function NewsCard({ title, image, onViewMore }) {
  return (
    <article className="group rounded-2xl border border-border bg-card shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-accent">
      {/* Título */}
      <div className="p-4 pb-">
        <h3 className="text-lg font-bold text-card-foreground line-clamp-2 group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>
      </div>

      {/* Imagen con altura media - efecto zoom en hover */}
      <div className="relative w-full h-48 overflow-hidden bg-muted">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Botón Ver más */}
      <div className="p-4 pt-3">
        <button
          onClick={onViewMore}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-lg transition-all duration-300 hover:shadow-md"
        >
          Ver más
        </button>
      </div>
    </article>
  )
}
