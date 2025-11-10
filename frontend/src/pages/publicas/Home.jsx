import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import HomeBenefits from "../../components/HomeBenefits";
import MembresiaCardHome from "../../components/MembresiaCardHome";
import MembresiasBenefits from "../../components/MembresiaBenefits";
import CarruselBanners from "../../components/CarruselBanners";

// hook y componente de membresías
import useMembresiasTipo from "../../hooks/useMembresiasTipo";

export default function Home() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  // hook para traer membresías reales
  const { data: membresias, isLoading: isLoadingMembresias } =
    useMembresiasTipo();

  useEffect(() => {
    if (!isLoading && user) {
      user.rol === "administrador" ? navigate("/usuarios") : navigate("/feed");
    }
  }, [user, isLoading, navigate]);

  // Evita que se renderice Home antes de redirigir
  if (isLoading || user) return <Loading />;

  return (
    <>
      <div className="min-h-screen bg-transparent text-black">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/20"></header>

        {/* panel principal con banner */}
        <section className="relative flex justify-center items-center py-14">
          <CarruselBanners />
        </section>

        {/* Sección de membresías reales */}
        <section id="planes" className="py-20 px-6 max-w-7xl mx-auto">
          <h2 className="text-6xl text-accent font-bold text-center mb-10">
            Planes de Membresía
          </h2>
          {isLoadingMembresias ? (
            <div className="flex justify-center items-center">
              <Loading />
            </div>
          ) : (
            <MembresiasBenefits data={membresias} />
          )}
        </section>

        {/* galería mejorada */}
        <HomeBenefits />

        <div className="h-20"></div>
        {/* Sección de ubicación */}
        <section className="py-20 bg-black text-center">
          <h1 className="font-sans text-4xl font-black uppercase leading-tight tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl pb-5">
            UBICACION{" "}
            <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              SPARTAN GYM
            </span>{" "}
          </h1>

          <div className="flex justify-center">
            <div className="overflow-hidden rounded-2xl shadow-2xl w-[90%] md:w-[70%] transform transition duration-500 hover:scale-105 hover:shadow-red-600/40">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1321.6099663586351!2d-58.61256659630211!3d-34.77470688560493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc4ef9311e623%3A0x87e13c53943281ef!2sSPARTAN%20GYM!5e0!3m2!1ses-419!2sar!4v1762531811297!5m2!1ses-419!2sar"
                width="100%"
                height="550"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
