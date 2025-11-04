import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAllRutinas } from "../../api/GymAPI";
import Loading from "../../components/Loading";
import RutinaCard from "../../components/RutinaCard";

const RutinasPage = () => {
  const {
    data: rutinas,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["rutinas"],
    queryFn: getAllRutinas,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen container p-10 max-w-7xl mx-auto">
      <h1 className="text-5xl font-bold text-center border-b border-accent pb-5">
        Rutinas
      </h1>

      {rutinas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {rutinas.map((rutina) => (
            <RutinaCard key={rutina._id} rutina={rutina}></RutinaCard>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No hay rutinas</p>
      )}
    </div>
  );
};

export default RutinasPage;
