import { useOutletContext } from "react-router-dom";
import Header from "../../components/Header";
import { useQuery } from "@tanstack/react-query";
import { getRutina } from "../../api/GymAPI";
import Loading from "../../components/Loading";
import EjercicioCard from "../../components/EjercicioCard";

export default function MiRutinaPage() {
  const { user } = useOutletContext();

  console.log(user);

  const dias_semana = {
    1: "Lunes",
    2: "Martes",
    3: "Miércoles",
    4: "Jueves",
    5: "Viernes",
    6: "Sábado",
  };

  const {
    data: rutina,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["rutina", user],
    queryFn: () => getRutina(null, user.rutina.rutinaId),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading)
    return (
      <div className="flex h-[80vh] items-center justify-center ">
        <Loading />
      </div>
    );

  if (isError) {
    return (
      <div className="flex h-[80vh] items-center justify-center ">
        <p className="text-placeholder text-xl">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen container  pt-10 mx-auto">
      <h1 className="text-center text-5xl font-bold border-b-3 border-accent pb-5">
        Mi Rutina
      </h1>

      <div className="px-5 pb-10">
        <h1 className="text-center text-3xl md:text-5xl font-bold mt-5">
          Ejercicios de la rutina{" "}
          <span className="text-accent block mt-2">{rutina.nombre}</span>
        </h1>

        {Array.from({ length: rutina.diasPorSemana }, (_, i) => i + 1).map(
          (dia) => (
            <div key={dia}>
              <p className="text-2xl font-bold mt-6 mb-3">
                Día <span className="text-accent">{dias_semana[dia]}</span>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
                {rutina.ejercicios
                  .filter((ejercicio) => ejercicio.dia === dia)
                  .map((ejercicio) => (
                    <EjercicioCard key={ejercicio._id} ejercicio={ejercicio} />
                  ))}{" "}
              </div>
              {!rutina.ejercicios.some((e) => e.dia == dia) && (
                <p className="text-xl text-placeholder">
                  No hay ningun ejercicio para este día
                </p>
              )}
            </div>
          ),
        )}
      </div>
    </div>
  );
}
