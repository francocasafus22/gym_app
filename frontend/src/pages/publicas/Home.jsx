import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

// hook y componente de membresías
import useMembresiasTipo from "../../hooks/useMembresiasTipo";
import MembresiaTipoCard from "../../components/MembresiaTipoCard";

export default function Home() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  // hook para traer membresías reales
  const { data: membresias, isLoading: isLoadingMembresias } = useMembresiasTipo();

  useEffect(() => {
    if (!isLoading && user) {
      user.rol === "administrador" ? navigate("/usuarios") : navigate("/feed");
    }
  }, [user, isLoading, navigate]);

  // Evita que se renderice Home antes de redirigir
  if (isLoading || user) return <Loading />;

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/20"></header>

        {/* panel principal */}
        <section className="pt-32 pb-20 px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            EL MEJOR GIMNASIO
            <br />
            DE DORREGO
          </h1>
          <button className="mt-12 bg-red-500 hover:bg-red-600 text-white px-8 py-6 text-lg font-semibold rounded">
            Inscríbete ahora
          </button>
        </section>

        <svg className="w-full h-16" viewBox="0 0 1200 100" preserveAspectRatio="none">
          <path
            d="M0,100 L200,20 L400,80 L600,20 L800,80 L1000,20 L1200,100 L1200,0 L0,0 Z"
            fill="#FF0000"
          />
        </svg>

        {/* Sección de membresías reales */}
        <section id="planes" className="py-20 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Planes de Membresía</h2>
          {isLoadingMembresias ? (
            <div className="flex justify-center items-center">
              <Loading />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {membresias &&
                membresias.map((membresia) => (
                  <MembresiaTipoCard
                    key={membresia._id || membresia.nombre}
                    data={membresia}
                    editable={false}
                  />
                ))}
            </div>
          )}
        </section>

        {/* separador */}
        <svg className="w-full h-8" viewBox="0 0 1200 40" preserveAspectRatio="none">
          <path
            d="M0,20 Q300,40 600,20 T1200,20 L1200,0 L0,0 Z"
            fill="#FF0000"
          />
        </svg>

        {/* galería mejorada */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto space-y-20">

            {/* Bloque 1 - Imagen Izquierda */}
            <div className="flex flex-col md:flex-row items-center gap-10">
              <img
                src="/public/SPARTAN_4.jpg"
                alt="Gym weights"
                className="w-full md:w-3/5 h-[500px] object-cover rounded-xl shadow-lg border border-white/10"
              />
              <div className="md:w-2/5 space-y-4 text-center md:text-left">
                <h3 className="text-3xl font-bold">Máquinas de Alta Calidad</h3>
                <p className="text-lg leading-relaxed text-gray-300">
                  Contamos con máquinas de última generación diseñadas para brindarte la mejor experiencia de entrenamiento posible.
                </p>
              </div>
            </div>

            {/* Bloque 2 - Imagen Derecha */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-10">
              <img
                src="/public/SPARTAN_6.jpg"
                alt="Gym interior"
                className="w-full md:w-3/5 h-[500px] object-cover rounded-xl shadow-lg border border-white/10"
              />
              <div className="md:w-2/5 space-y-4 text-center md:text-left">
                <h3 className="text-3xl font-bold">Luces Nuevas</h3>
                <p className="text-lg leading-relaxed text-gray-300">
                  Nuestro espacio se renueva constantemente con una iluminación moderna que realza cada detalle del gimnasio.
                </p>
              </div>
            </div>

          </div>
        </section>

        <div className="h-20"></div>
      </div>
    </>
  );
}