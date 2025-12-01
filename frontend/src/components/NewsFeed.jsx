// NewsFeed.jsx
import NewsCard from "./NewsCard";

export default function NewsFeed() {
    const newsItems = [
        { id: 1, title: "Promo 2x1 en nuevos ingresantes", image: "/img1.jpg" },
        { id: 2, title: "Viernes cerrado 26/10 — feriado nacional", image: "/img2.jpg" },
        { id: 3, title: "Competencia de Halloween", image: "/img3.jpg" },
        { id: 4, title: "Nuevo equipamiento de cardio", image: "/img4.png" },
        { id: 5, title: "Clase especial de CrossFit", image: "/img5.jpg" },
        { id: 6, title: "Taller de nutrición deportiva", image: "/img3.jpg" },
    ];

    return (
        <div className="container mx-auto px-4 py-6 max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-accent mb-6 text-center">
                Todas las Publicaciones
            </h1>

            {/* Feed vertical tipo Twitter */}
            <div className="flex flex-col gap-4">
                {newsItems.map((item) => (
                    <NewsCard
                        key={item.id}
                        title={item.title}
                        image={item.image}
                    />
                ))}
            </div>
        </div>
    );
}