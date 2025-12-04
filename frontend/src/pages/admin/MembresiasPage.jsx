import React from "react";
import { Plus } from "lucide-react";
import useMembresiasTipo from "../../hooks/useMembresiasTipo";
import MembresiaTipoCard from "../../components/MembresiaTipoCard.jsx";
import Loading from "../../components/Loading";

const MembresiasPage = () => {
  const { data, isLoading } = useMembresiasTipo();

  return (
    <div className="min-h-screen  container p-10 max-w-7xl mx-auto">
      <h1 className="text-5xl font-bold text-center mb-10 pb-5 border-b border-accent">
        Membresias
      </h1>

      {isLoading ? (
        <div className=" flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
          {data &&
            data.map((data) => (
              <MembresiaTipoCard key={data.nombre} data={data} />
            ))}

         
        </div>
      )}
    </div>
  );
};

export default MembresiasPage;
