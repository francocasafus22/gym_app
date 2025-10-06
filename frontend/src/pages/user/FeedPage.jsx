import NewsCard from "../../components/NewsCard";


export default function HomePage() {
  const newsItems = [
    {
      id: 1,
      title: "Promo 2x1 en nuevos ingresantes (3x1 en mujeres)",
      image: "/img1.jpg",
    },
    {
      id: 2,
      title: "Viernes cerrado 21/09 — feriado nacional",
      image: "/img2.jpg",
    },
    {
      id: 3,
      title: "Competencia de Halloween",
      image: "/img3.jpg",
    },

    {
      id: 5,
      title: "Nuevo equipamiento de cardio",
      image: "/img5.jpg",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#111] text-white overflow-hidden">

      {/* Fondos decorativos (más visibles y variados) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Grupo de logos distribuidos */}
        <div className="absolute -left-20 top-10 w-72 h-72 opacity-20 rotate-6">
          <img src="/logoSolo.png" alt="Logo Spartan" className="w-full h-full object-contain" />
        </div>

        <div className="absolute right-16 top-32 w-80 h-80 opacity-15 -rotate-12">
          <img src="/logoSolo.png" alt="Logo Spartan" className="w-full h-full object-contain" />
        </div>

        <div className="absolute left-1/3 top-1/2 w-64 h-64 opacity-10 rotate-3">
          <img src="/logoSolo.png" alt="Logo Spartan" className="w-full h-full object-contain" />
        </div>

        <div className="absolute right-1/4 bottom-16 w-96 h-96 opacity-15 rotate-12">
          <img src="/logoSolo.png" alt="Logo Spartan" className="w-full h-full object-contain" />
        </div>

        <div className="absolute left-8 bottom-24 w-60 h-60 opacity-20 -rotate-6">
          <img src="/logoSolo.png" alt="Logo Spartan" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-16 max-w-2xl">
        <div className="flex flex-col gap-8">
          {newsItems.map((item) => (
            <NewsCard key={item.id} title={item.title} image={item.image} />
          ))}
        </div>
      </div>
    </div>
  );
}
