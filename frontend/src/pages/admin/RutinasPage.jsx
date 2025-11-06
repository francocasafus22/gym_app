import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAllRutinas } from "../../api/GymAPI";
import Loading from "../../components/Loading";
import RutinaCard from "../../components/RutinaCard";
import { Plus } from "lucide-react";
import { useState } from "react";
import Modal from "../../components/Modal";
import CreateRutinaForm from "../../components/forms-modal/CreateRutinaForm";

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen container p-10 max-w-7xl mx-auto">
      <h1 className="text-5xl font-bold text-center border-b border-accent pb-5">
        Rutinas
      </h1>

      {rutinas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 auto-rows-fr">
          {rutinas.map((rutina) => (
            <RutinaCard key={rutina._id} rutina={rutina}></RutinaCard>
          ))}
          <button
            className="bg-zinc-800 shadow-2xl h-full flex flex-col  text-center rounded-3xl hover:brightness-90 cursor-pointer transition-all duration-300 ease-in-out"
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <div className="flex flex-col justify-center items-center h-full p-5 rounded-t-3xl ">
              <Plus size={100} strokeWidth={1} className="text-accent" />
            </div>
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No hay rutinas</p>
      )}

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <CreateRutinaForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default RutinasPage;
