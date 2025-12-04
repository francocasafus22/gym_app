import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { getAllPublicaciones } from '../../api/GymAPI';
import Loading from '../../components/Loading';
import { toast } from 'sonner';

const DashboardPage = () => {
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(null);
    const [error, setError] = useState(null);
    const queryClient = useQueryClient()

    const token = localStorage.getItem('AUTH_TOKEN');

    const {data, isLoading: isLoadingPublicaciones, isError, error: errorPublicaciones} = useQuery({
        queryKey: ["publicaciones"],
        queryFn: ()=>getAllPublicaciones(),
        retry: 1,
        refetchOnWindowFocus: false
    })

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
            const res = await fetch(`${import.meta.env.VITE_API_URL}/news`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                },
                body: JSON.stringify({
                    title: title.trim(),
                    image: "default.jpg"
                })
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.message || 'Error en la petición');
            }

            await res.json();
            toast.success(msg)
            setTitle('');

        } catch (err) {
            console.error(err);
            setError(err.message || 'Error');
        } finally {
            setLoading(false);
            queryClient.invalidateQueries(["publicacione"])
        }
    };

    return (
        <div className='max-w-xl flex flex-col my-10 mx-auto px-5 md:px-0'>
            <h2
                style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    marginBottom: "20px",
                    color: "#111",
                }}
            >
                Dashboard — Crear Publicación
            </h2>

            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "18px",
                    background: "#fafafa",
                    padding: "24px",
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 3px 10px rgba(0,0,0,0.06)",
                }}
            >
                <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <span style={{ fontWeight: 600, color: "#333" }}>Título</span>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Título de la publicación"
                        required
                        style={{
                            padding: "10px 12px",
                            borderRadius: "8px",
                            border: "1px solid #d1d5db",
                            fontSize: "15px",
                            background: "#fff",
                            outline: "none",
                            transition: "0.2s",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "#DC2626")}
                        onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                    />
                </label>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        background: "#DC2626",
                        color: "white",
                        padding: "10px 18px",
                        borderRadius: "8px",
                        border: "none",
                        fontSize: "16px",
                        fontWeight: "600",
                        cursor: "pointer",
                        boxShadow: "0 3px 10px rgba(220,38,38,0.36)",
                        transition: "0.3s",
                    }}
                    onMouseOver={(e) =>
                        (e.target.style.boxShadow = "0 6px 18px rgba(220,38,38,0.55)")
                    }
                    onMouseOut={(e) =>
                        (e.target.style.boxShadow = "0 3px 10px rgba(220,38,38,0.36)")
                    }
                >
                    {loading ? "Creando..." : "Crear Publicación"}
                </button>
            </form>

            {msg && (
                <p style={{ color: "green", marginTop: "16px", fontWeight: 600 }}>
                    {msg}
                </p>
            )}
            {error && (
                <p style={{ color: "red", marginTop: "16px", fontWeight: 600 }}>
                    {error}
                </p>
            )}

            {isLoadingPublicaciones ? <p>Cargando</p> : (
            
            <div className='flex flex-col gap-5 mt-5'>
                {data.map(p=>
                <div 
                key={p._id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all"
            >

                <div className="p-4 flex flex-col gap-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {p.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                        Fecha : {new Date(p.createdAt).toLocaleDateString("es-AR")}
                    </p>
                   
                </div>
            </div>
            
            
            )
            
            }
            </div>
            
            )}
        </div>
    );
};

export default DashboardPage;