import { Link, useOutletContext } from "react-router-dom";
import Loading from "../../components/Loading";
import NewsCard from "../../components/NewsCard";

import {
  CreditCard,
  Dumbbell,
  LineChart,
  Newspaper,
  User,
  BicepsFlexed,
  HelpCircle,
} from "lucide-react";
import {
  capitalize,
  diasRestantes,
  fechaDiaMesAño,
} from "../../utils/formatText";
import { useQuery } from "@tanstack/react-query";
import { getAllPublicaciones, getStats } from "../../api/GymAPI";

export default function HomePage() {
  // Recibe el user del layout
  const { user } = useOutletContext();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const {data: publicaciones, isLoading: isLoadingPublicaciones} = useQuery({
    queryKey: ["publicaciones"],
    queryFn: getAllPublicaciones,
    retry: 1,
    refetchOnWindowFocus: false
  })

  return (
    <div className="container mx-auto  text-secondary p-6 flex flex-col gap-6 ">
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
              {user.membresia[0]
                ? capitalize(user.membresia[0].tipo.nombre)
                : "No tiene membresia"}
            </span>
            {" | "}
            { }
            <span
              className={`${user.membresia[0]?.estado ? "bg-green-500" : "bg-red-500"} rounded-2xl px-3 text-primary`}
            >
              {user.membresia[0]?.estado ? "Activa" : "Vencida"}
            </span>
          </p>

          {user.membresia[0] ? (
            <p>
              Vence el{" "}
              <strong>{fechaDiaMesAño(user.membresia[0].fechaFin)}</strong>
            </p>
          ) : null}

          <p>
            <span className="font-bold text-accent">
              {user.membresia[0]
                ? diasRestantes(user.membresia[0].fechaFin)
                : 0}
            </span>{" "}
            días restantes
          </p>

          <Link
            className="mt-4 bg-accent text-accent-foreground hover:bg-accent-hover font-medium px-4 py-2 rounded-xl transition-all"
            to={"/mi-membresia"}
          >
            Ver mis membresías
          </Link>
        </section>

        {/* Rutina actual */}
        <section className="border border-border rounded-2xl p-5 shadow-md flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
            <Dumbbell className="text-accent" /> Rutina Actual
          </h2>
          <p className="font-medium">
            {user.rutina ? user.rutina.nombre : "No tiene rutina"}
          </p>

          <div className="flex flex-col gap-2">
            <Link
              className="mt-4 bg-accent text-accent-foreground hover:bg-accent-hover font-medium px-4 py-2 rounded-xl transition-all text-center"
              to={"/mi-rutina"}
            >
              Ver rutina completa
            </Link>
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

          {isLoading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-3 text-center">
              <div>
                <p className="text-3xl font-bold text-accent">
                  {stats.entrenamientosMes || 0}
                </p>
                <p className="text-zinc-400 text-sm">Asistencias este mes</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent">
                  {user.membresia.length || 0}
                </p>
                <p className="text-zinc-400 text-sm">Meses activo</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent">
                  {stats.entreamientosSemana || 0} / 5
                </p>
                <p className="text-zinc-400 text-sm">Asistencia esta semana</p>
              </div>
            </div>
          )}

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {isLoadingPublicaciones ? <p>Cargando</p> : publicaciones.map((item) => (
              <NewsCard key={item.id} title={item.title} image={"/logoSolo.png"} />
            ))}
          </div>
        </ul>
        <Link
          to="/publicaciones"
          className="mt-4 text-accent-foreground bg-accent hover:bg-accent-hover font-bold px-4 py-2 rounded-xl transition-all inline-block text-center"
        >
          Ver más publicaciones →
        </Link>
      </section>

      {/* Accesos rápidos */}
      <section className="border border-border rounded-2xl p-5 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Accesos rápidos</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { icon: Dumbbell, text: "Mi Rutina", href: "/mi-rutina" },
            {
              icon: BicepsFlexed,
              text: "Entrenamientos",
              href: "/mis-entrenamientos",
            },
            { icon: CreditCard, text: "Membresía", href: "/mi-membresia" },
            { icon: Newspaper, text: "Publicaciones", href: "/publicaciones" },
            { icon: User, text: "Perfil", href: "/mi-perfil" },
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