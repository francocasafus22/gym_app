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

          <button className="bg-zinc-800 shadow-2xl h-90 flex flex-col  text-center rounded-3xl hover:brightness-90 cursor-pointer transition-all duration-300 ease-in-out">
            <div className="flex flex-col justify-center items-center h-full p-5 rounded-t-3xl ">
              <Plus size={100} strokeWidth={1} className="text-accent" />
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default MembresiasPage;
