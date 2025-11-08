import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRutina } from "../../api/GymAPI";
import Loading from "../../components/Loading";
import EjercicioEntrenamientoCard from "../../components/EjercicioEntrenamientoCard";
import { useState } from "react";
import { useEffect } from "react";

export default function EntrenamientoPage() {
  const { user } = useOutletContext();
  const [ejercicioIndex, setEjercicioIndex] = useState(0);
  const [finRutina, setFinRutina] = useState(false);

  console.log(user);

  const dias = {
    1: "Lunes",
    2: "Martes",
    3: "Miércoles",
    4: "Jueves",
    5: "Viernes",
    6: "Sábado",
    7: "Domingo",
  };

  const diaHoy = new Date().getDay();

  const { data: rutina, isLoading } = useQuery({
    queryKey: ["rutina-user"],
    queryFn: () => getRutina(null, user.rutina.rutinaId),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (rutina) console.log(rutina);

  const ejercicios = rutina?.ejercicios.filter(
    (ejercicio) => ejercicio.dia === 1,
  );

  useEffect(() => {
    if (ejercicios && ejercicioIndex >= ejercicios.length) {
      setFinRutina(true);
    }
  }, [ejercicioIndex, ejercicios]);

  return (
    <div className="container mx-auto  text-secondary p-6 flex flex-col gap-6">
      <h1 className="text-center text-5xl md:text-6xl font-bold ">
        Entrenamiento <span className="text-accent">{user.rutina.nombre}</span>
      </h1>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <p className="text-center text-3xl font-bold ">
            Dia <span className="text-accent">{dias[diaHoy]}</span>
          </p>

          {!finRutina && ejercicios && ejercicios[ejercicioIndex] ? (
            <EjercicioEntrenamientoCard
              ejercicio={ejercicios[ejercicioIndex]}
              setEjercicioIndex={setEjercicioIndex}
            />
          ) : (
            <p className="text-2xl text-center text-accent font-bold mt-10">
              Finalizaste
            </p>
          )}
        </>
      )}
    </div>
  );
}
