import { useQuery } from "@tanstack/react-query";
import { getAllEntrenamientosByUser } from "../../api/GymAPI";
import Loading from "../../components/Loading";
import { cronometro, fechaDiaMesAño } from "../../utils/formatText";
import { useState } from "react";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";

export default function MisEntrenamientosPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["mis-entrenamientos", currentPage],
    queryFn: () => getAllEntrenamientosByUser(currentPage),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loading />
      </div>
    );

  if (isError) {
    return (
      <div className="flex items-center justify-center h-[80vh]">{error}</div>
    );
  }

  return (
    <div className="min-h-screen container p-10 max-w-7xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-center border-b-3 border-accent pb-5 mb-5">
        Mis Entrenamientos
      </h1>

      <p className="text-center text-2xl font-bold mb-5">
        Total:{" "}
        <span className="text-accent">
          {data.pagination.totalEntrenamientos}
        </span>
      </p>

      {data.entrenamientos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {data.entrenamientos.map((e) => (
            <div
              className="group border border-border rounded-xl shadow-md p-5 flex flex-col items-center justify-center hover:shadow-xl cursor-pointer tratransition-all duration-300 hover:bg-accent hover:text-accent-foreground ease-in-out"
              key={e._id}
              onClick={() => navigate(`/mis-entrenamientos/${e._id}`)}
            >
              <p className="text-xl">
                Fecha:{" "}
                <span className="text-accent group-hover:text-accent-foreground font-medium transition-all duration-300">
                  {fechaDiaMesAño(e.fecha)}
                </span>
              </p>
              <p className="text-xl">
                Duración:{" "}
                <span className="text-accent group-hover:text-accent-foreground font-medium transition-all duration-300">
                  {cronometro(e.duracion)}
                </span>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-2xl mt-10">No hay entrenamientos</p>
      )}

      <Pagination
        currentPage={data.pagination.currentPage}
        totalPages={data.pagination.totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
