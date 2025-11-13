import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getEntrenamientoById } from "../../api/GymAPI";
import Loading from "../../components/Loading";
import EjercicioCard from "../../components/EjercicioCard";
import { fechaDiaMesAño } from "../../utils/formatText";
import { Dumbbell } from "lucide-react";
import InfoEntrenamiento from "../../components/InfoEntrenamiento";

export default function EntrenamientoDetailsPage() {
  const { id } = useParams();

  const { data: entrenamiento, isLoading } = useQuery({
    queryKey: ["entrenamiento"],
    queryFn: () => getEntrenamientoById(id),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loading />
      </div>
    );

  if (entrenamiento) {
    console.log(entrenamiento);
  }

  return (
    <div className="container mx-auto  text-secondary p-6 flex flex-col  gap-6">
      <h1 className="text-4xl md:text-6xl font-bold border-b-3 pb-5 border-accent text-center">
        Entrenamiento
        <p className="text-accent text-3xl md:text-5xl">
          {fechaDiaMesAño(entrenamiento.fecha)}
        </p>
      </h1>

      <InfoEntrenamiento entrenamiento={entrenamiento} />

      <h2 className="text-4xl font-semibold flex items-center mx-auto md:mx-0 gap-2 mt-5">
        <Dumbbell className="text-accent" size={38} /> Ejercicios
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {entrenamiento.pesos_ejercicios.map((e) => (
          <EjercicioCard ejercicio={e} showSeries={true} />
        ))}
      </div>
    </div>
  );
}
