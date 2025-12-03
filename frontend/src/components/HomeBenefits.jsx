import React from "react";

const benefits = [
  {
    id: 1,
    title: "Equipamiento de Última Generación",
    description:
      "Accede a las máquinas más avanzadas del mercado. Tecnología de punta para maximizar tus resultados y llevar tu entrenamiento al siguiente nivel.",
    image: "/SPARTAN_3.jpg",
  },
  {
    id: 2,
    title: "Entrenadores Certificados",
    description:
      "Nuestro equipo de profesionales certificados te guiará en cada paso. Planes personalizados diseñados específicamente para alcanzar tus objetivos.",
    image: "/SPARTAN_2.jpg",
  },
  {
    id: 3,
    title: "Clases Grupales Energéticas",
    description:
      "Únete a sesiones dinámicas de CrossFit, spinning, yoga y más. Entrena con una comunidad motivada que te impulsa a superarte cada día.",
    image: "/SPARTAN_6.jpg",
  },
  {
    id: 4,
    title: "Zona de Recuperación",
    description:
      "Sauna, jacuzzi y área de estiramiento para tu recuperación muscular. Cuida tu cuerpo después de cada entrenamiento intenso.",
    image: "/SPARTAN_4.jpg",
  },
  {
    id: 5,
    title: "Nutrición Personalizada",
    description:
      "Asesoría nutricional incluida en tu membresía. Planes alimenticios adaptados a tus metas de fitness y estilo de vida.",
    image: "/SPARTAN_5.jpg",
  },
  {
    id: 6,
    title: "Horarios Flexibles 24/7",
    description:
      "Entrena cuando quieras, sin restricciones. Acceso las 24 horas del día, los 7 días de la semana para adaptarnos a tu agenda.",
    image: "/SPARTAN_7.jpg",
  },
];

export default function HomeBenefits() {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Lado Izquierdo - Fijo */}
      <div className="flex items-center justify-center bg-transparent lg:sticky lg:top-0 lg:h-screen lg:w-1/2">
        <div className="px-8 py-16 text-center lg:px-12">
          <h1 className="font-sans text-4xl font-black uppercase leading-tight tracking-tight text-black md:text-5xl lg:text-6xl xl:text-7xl">
            Explora todos los{" "}
            <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              beneficios
            </span>{" "}
            de Spartan Gym
          </h1>
          {/* Logo debajo del texto */}
          <img
            src="/logoSolo.png"
            alt="Logo Spartan Gym"
            className="mt-8 mx-auto h-20 w-auto"
          />
        </div>
      </div>

      {/* Lado Derecho Scrollable */}
      <div className="bg-transparent lg:w-1/2">
        <div className="space-y-8 p-6 md:p-8 lg:p-12">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="group overflow-hidden rounded-2xl border borde-border bg-gradient-to-r from-red-600 to-orange-500 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-900/20"
            >
              <div className="relative h-64 w-full overflow-hidden md:h-80">
                <img
                  src={benefit.image || "/placeholder.svg"}
                  alt={benefit.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
              </div>
              <div className="p-6 md:p-8">
                <h2 className="mb-3 font-sans text-2xl font-bold text-primary md:text-3xl">
                  {benefit.title}
                </h2>
                <p className="font-sans leading-relaxed text-primary">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
