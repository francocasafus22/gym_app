import { Link, useOutletContext } from "react-router-dom";
import Loading from "../../components/Loading";
import NewsCard from "../../components/NewsCard";

import {
  CreditCard,
  Dumbbell,
  LineChart,
  Newspaper,
  User,
  Icon,
  HelpCircle,
} from "lucide-react";
import {
  capitalize,
  diasRestantes,
  fechaDiaMesAño,
} from "../../utils/formatText";

export default function HomePage() {
  // Recibe el user del layout
  const { user } = useOutletContext();

  console.log(user);

  const newsItems = [
    {
      id: 1,
      title: "Promo 2x1 en nuevos ingresantes (3x1 en mujeres)",
      image: "/img1.jpg",
    },
    {
      id: 2,
      title: "Viernes cerrado 26/10 — feriado nacional",
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
    <div className="container mx-auto  text-secondary p-6 flex flex-col gap-6">
      {/* Bienvenida */}
      <section>
        <h1 className="text-3xl font-bold text-center">
          ¡Hola, <span className="text-accent">{user.firstName}</span>!
        </h1>
        <p className="text-zinc-400 mt-1 text-center">
          Bienvenido a Spartan Gym
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Estado de membresía */}
        <section className=" border border-border rounded-2xl p-5 flex flex-col items-center justify-center shadow-md">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
            <CreditCard className="text-accent" /> Mi Membresía
          </h2>
          <p>
            Tipo:{" "}
            <span className="text-accent">
              {capitalize(user.membresia[0].tipo.nombre)}
            </span>
            {" | "}
            {}
            <span
              className={`${user.membresia[0].estado ? "bg-green-500" : "bg-red-500"} rounded-2xl px-3 text-primary`}
            >
              {user.membresia[0].estado ? "Activa" : "Vencida"}
            </span>
          </p>

          <p>
            Vence el{" "}
            <strong>{fechaDiaMesAño(user.membresia[0].fechaFin)}</strong>
          </p>

          <p>
            <span className="font-bold text-accent">
              {diasRestantes(user.membresia[0].fechaFin)}
            </span>{" "}
            días restantes
          </p>

          <button className="mt-4 bg-accent text-accent-foreground hover:bg-accent-hover font-medium px-4 py-2 rounded-xl transition-all">
            Renovar Membresía
          </button>
        </section>

        {/* Rutina actual */}
        <section className="border border-border rounded-2xl p-5 shadow-md flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
            <Dumbbell className="text-accent" /> Rutina Actual
          </h2>
          <p className="font-medium">{user.rutina.nombre}</p>

          <div className="flex flex-col gap-2">
            <button className="mt-4 bg-accent text-accent-foreground hover:bg-accent-hover font-medium px-4 py-2 rounded-xl transition-all">
              Ver rutina completa
            </button>
            <Link
              className=" bg-accent text-accent-foreground hover:bg-accent-hover font-medium px-4 py-2 rounded-xl transition-all"
              to={"/entrenamiento"}
            >
              Comenzar entrenamiento
            </Link>
          </div>
        </section>

        {/* Estadísticas */}
        <section className="border border-border rounded-2xl p-5 shadow-md flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <LineChart className="text-accent" /> Estadísticas
          </h2>
          <div className="grid grid-cols-3 text-center">
            <div>
              <p className="text-3xl font-bold text-accent">{18}</p>
              <p className="text-zinc-400 text-sm">Asistencias este mes</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent">{5}</p>
              <p className="text-zinc-400 text-sm">Meses activo</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent">5 / 5</p>
              <p className="text-zinc-400 text-sm">Asistencia esta semana</p>
            </div>
          </div>
          <button className="mt-4 bg-accent text-accent-foreground hover:bg-accent-hover font-medium px-4 py-2 rounded-xl transition-all">
            Ver Estadísticas
          </button>
        </section>
      </div>

      {/* Publicaciones */}
      <section className="border border-border rounded-2xl p-5 shadow-md">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-3">
          <Newspaper className="text-accent" /> Novedades
        </h2>
        <ul className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {newsItems.map((item) => (
              <NewsCard key={item.id} title={item.title} image={item.image} />
            ))}
          </div>
        </ul>
        <button className="mt-4 text-accent-foreground bg-accent hover:bg-accent-hover font-bold px-4 py-2 rounded-xl transition-all">
          Ver más publicaciones →
        </button>
      </section>

      {/* Accesos rápidos */}
      <section className="border border-border rounded-2xl p-5 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Accesos rápidos</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { icon: Dumbbell, text: "Mi Rutina", href: "/mi-rutina" },
            { icon: CreditCard, text: "Membresía", href: "/mi-membresia" },
            { icon: Newspaper, text: "Publicaciones", href: "/publicaciones" },
            { icon: User, text: "Perfil", href: "/mi-perfil" },
            { icon: HelpCircle, text: "Soporte", href: "/soporte" },
          ].map(({ icon: Icon, text, href }, i) => (
            <Link
              key={i}
              to={`${href}`}
              className="group flex flex-col items-center justify-center h-25 lg:h-50 border border-border hover:bg-accent cursor-pointer hover:text-primary rounded-xl py-3 transition-all duration-300"
            >
              <Icon
                className="text-accent group-hover:text-primary transition-all duration-300 mb-1"
                size={24}
              />
              <span className="text-sm font-medium">{text}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
