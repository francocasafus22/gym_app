import React, { useState } from 'react';

const DashboardPage = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(null);
    const [error, setError] = useState(null);


    const token = localStorage.getItem('AUTH_TOKEN');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setMsg(null);

        if (!title.trim()) {
            setError('El título es obligatorio');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('http://localhost:4000/api/news', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                },
                body: JSON.stringify({
                    title: title.trim(),
                    image: image.trim()
                })
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.message || 'Error en la petición');
            }

            const created = await res.json();
            setMsg('Publicación creada correctamente');
            setTitle('');
            setImage('');

        } catch (err) {
            console.error(err);
            setError(err.message || 'Error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 700, margin: '0 auto', padding: 20 }}>
            <h2>Dashboard - Crear Publicación</h2>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 10 }}>
                <label>
                    Título
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Título de la publicación"
                        required
                    />
                </label>

                <label>
                    Image URL (opcional)
                    <input
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="https://..."
                    />
                </label>

                <button type="submit" disabled={loading}>
                    {loading ? 'Creando...' : 'Crear Publicación'}
                </button>
            </form>

            {msg && <p style={{ color: 'green' }}>{msg}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default DashboardPage;