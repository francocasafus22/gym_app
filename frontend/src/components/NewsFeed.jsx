// frontend/src/components/NewsFeed.jsx
import React, { useState, useEffect } from 'react';

const NewsFeed = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        let mounted = true;
        const fetchNews = async () => {
            try {
                const res = await fetch('/api/news');
                if (!res.ok) throw new Error('No se pudieron cargar las noticias');
                const data = await res.json();
                if (mounted) {
                    setItems(data);
                }
            } catch (error) {
                console.error(error);
                if (mounted) setErr(error.message);
            } finally {
                if (mounted) setLoading(false);
            }
        };
        fetchNews();
        return () => (mounted = false);
    }, []);

    if (loading) return <div>Cargando noticias...</div>;
    if (err) return <div>Error: {err}</div>;
    if (!items.length) return <div>No hay publicaciones aún.</div>;

    return (
        <div style={{ display: 'grid', gap: 12 }}>
            {items.map((it) => (
                <article key={it._id} style={{ border: '1px solid #ddd', padding: 12, borderRadius: 6 }}>
                    {it.image && (
                        <div style={{ marginBottom: 8 }}>
                            <img src={it.image} alt={it.title} style={{ maxWidth: '100%', height: 'auto' }} />
                        </div>
                    )}
                    <h3>{it.title}</h3>
                    <small>{new Date(it.createdAt).toLocaleString()}</small>
                </article>
            ))}
        </div>
    );
};

export default NewsFeed;