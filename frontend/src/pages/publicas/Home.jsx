import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import HomeBenefits from "../../components/HomeBenefits";
import MembresiaCardHome from "../../components/MembresiaCardHome";

// hook y componente de membresías
import useMembresiasTipo from "../../hooks/useMembresiasTipo";

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
      <div className="min-h-screen bg-zinc-950 text-white">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/20"></header>

        {/* panel principal con banner */}
        <section className="relative flex justify-center items-center py-14">
          <div className="w-[69%] max-w-8xl rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/ELMEJORGYM.png"
              alt="Banner gimnasio"
              className="w-full h-auto object-contain scale-[1.1]"
            />
          </div>
        </section>

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
                  <MembresiaCardHome data={membresia} />
                ))}
            </div>
          )}
        </section>

        {/* galería mejorada */}
        <HomeBenefits />

        <div className="h-20"></div>
      </div>
    </>
  );
}