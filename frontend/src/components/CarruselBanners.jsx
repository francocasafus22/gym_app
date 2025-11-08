import { useState, useEffect } from "react";

export default function CarruselBanners() {
    const banners = ["/banner1.png", "/banner2.png", "/banner3.png"];
    const [current, setCurrent] = useState(0);

    // Cambia automáticamente cada 5 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length);
        }, 8000);
        return () => clearInterval(interval);
    }, [banners.length]);

    // Funciones para avanzar y retroceder manualmente
    const nextSlide = () => setCurrent((prev) => (prev + 1) % banners.length);
    const prevSlide = () =>
        setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

    return (
        <section className="relative flex justify-center items-center py-8">
            <div className="relative w-[100%] max-w-7xl rounded-2xl overflow-hidden shadow-2xl group">
                {/* Imagen del banner */}
                <img
                    src={banners[current]}
                    alt={`Banner ${current + 1}`}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Botones de navegación */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full transition"
                >
                    ❮
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full transition"
                >
                    ❯
                </button>

                {/* Indicadores inferiores */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {banners.map((_, i) => (
                        <div
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${current === i ? "bg-yellow-400 scale-110" : "bg-gray-400/70"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}