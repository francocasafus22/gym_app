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
  const [segundos, setSegundos] = useState(0);
  // Estado del entrenamiento que se actualizará cada vez que se complete un ejercicio
  const [entrenamiento, setEntrenamiento] = useState({
    rutinaId: user.rutina.rutinaId,
    fecha: new Date().toISOString(),
    pesos_ejercicios: [],
  });
  const [finRutina, setFinRutina] = useState(false);

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

  // Obtener la rutina del user
  const { data: rutina, isLoading } = useQuery({
    queryKey: ["rutina-user"],
    queryFn: () => getRutina(null, user.rutina.rutinaId),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // Filtrar los ejercicios de la rutina que sean del dia de hoy
  const ejercicios = rutina?.ejercicios.filter(
    (ejercicio) => ejercicio.dia === diaHoy,
  );

  useEffect(() => {
    let intervalo;
    if (!finRutina) {
      intervalo = setInterval(() => {
        setSegundos((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(intervalo);
  }, [finRutina]);

  const minutos = Math.floor((segundos % 3600) / 60);
  const segundosRestantes = segundos % 60;
  const horas = Math.floor(segundos / 3600);

  const formato = `${horas.toString().padStart(2, "0")}:${minutos.toString().padStart(2, "0")}:${segundosRestantes.toString().padStart(2, "0")}`;

  const handleSiguiente = (seriesData) => {
    // Guardar los pesos y repeticiones de las series del ejercicio completado
    setEntrenamiento((prev) => ({
      ...prev,
      pesos_ejercicios: [
        ...prev.pesos_ejercicios,
        {
          ejercicio: {
            ejercicioId: ejercicios[ejercicioIndex]._id,
            nombre: ejercicios[ejercicioIndex].nombre,
          },
          series: seriesData,
        },
      ],
    }));

    if (ejercicioIndex < ejercicios.length - 1) {
      // Pasar al siguiente ejercicio
      setEjercicioIndex((prev) => prev + 1);
    } else {
      // Si ya es el ultimo ejercicio, enviar los datos al backend
      setFinRutina(true);
      // Establecerle la duración en segundos al entrenamiento al finalizar
      setEntrenamiento((prev) => ({
        ...prev,
        duracion: segundos,
      }));
      console.log("llamda api");
      console.log(entrenamiento);
      // TODO: llamada a la api
    }
  };

  return (
    <div className="container mx-auto  text-secondary p-6 flex flex-col gap-6">
      <h1 className="text-center text-5xl mt-5 font-bold ">
        Entrenamiento <span className="text-accent">{user.rutina.nombre}</span>
      </h1>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <p className="text-center text-3xl font-bold ">
            Dia <span className="text-accent">{dias[diaHoy]}</span>
          </p>

          <div className="bg-accent flex justify-center px-5 py-2 rounded-xl mx-auto">
            <p className="text-2xl text-center text-accent-foreground">
              Tiempo: {formato}
            </p>
          </div>

          {!finRutina && ejercicios && ejercicios[ejercicioIndex] ? (
            <EjercicioEntrenamientoCard
              ejercicio={ejercicios[ejercicioIndex]}
              onSiguiente={handleSiguiente}
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
