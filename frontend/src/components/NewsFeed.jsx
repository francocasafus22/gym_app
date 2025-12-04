import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";

export default function NewsFeed() {
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchNews() {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/news`);
                const data = await res.json();
                setNewsItems(data);
            } catch (err) {
                console.log("Error al cargar noticias", err);
            } finally {
                setLoading(false);
            }
        }

        fetchNews();
    }, []);

    if (loading) return <p>Cargando noticias...</p>;

    return (
        <div
            className="news-feed"
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                padding: "20px",
                maxWidth: "600px",
                margin: "0 auto",
            }}
        >
            {newsItems.map((item) => (
                <NewsCard key={item._id} title={item.title} image="/public/logoSolo.png" />
            ))}
        </div>
    );
}