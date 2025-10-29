import { useState } from "react";
import Modal from "./Modal";
import { fechaDiaMesAño } from "../utils/formatText";
import EditarRutina from "./forms-modal/EditarRutina";

export default function RutinaCard({ rutina }) {
  const [isRutinaOpen, setIsRutinaOpen] = useState(false);
  const [isEjercicioOpen, setIsEjercicioOpen] = useState(false);

  return (
    <div className="bg-zinc-800 shadow-2xl h-auto py-10 flex flex-col  text-center rounded-3xl">
      <div className="flex flex-col justify-center items-center px-5 h-4/5  rounded-t-3xl w-full">
        <h1 className="text-5xl font-bold">{rutina.nombre}</h1>
        <p className="text-lg font-light mt-2 w-full ">{rutina.descripcion}</p>
        <div className="grid grid-cols-2 gap-2 my-5">
          <p className="text-md font-bold border-2 border-accent rounded-xl px-2 py-1">
            Nivel: {rutina.nivel}
          </p>
          <p className="text-md font-bold border-2 border-accent rounded-xl px-2 py-1 ">
            Tipo: {rutina.tipo}
          </p>
          <p className="text-md font-bold border-2 border-accent rounded-xl px-2 py-1 ">
            Dias: {rutina.diasPorSemana}
          </p>
          <p className="text-md font-bold border-2 border-accent rounded-xl px-2 py-1 ">
            Ejercicios: {rutina.ejercicios.length}
          </p>
        </div>
      </div>
      <p className="text-md font-light text-gray-400 mb-5">
        Actualizado: {fechaDiaMesAño(rutina.updatedAt)}
      </p>
      <div className="flex flex-col xs:flex-row w-full justify-between px-5 gap-5">
        <button
          className="px-6 py-2 w-full  bg-accent text-accent-foreground rounded-lg hover:brightness-80  transition-all duration-200 cursor-pointer"
          onClick={() => setIsRutinaOpen(!isRutinaOpen)}
        >
          Editar Rutina
        </button>
        <button
          className="px-6 py-2 w-full bg-accent text-accent-foreground rounded-lg hover:brightness-80  transition-all duration-200 cursor-pointer"
          onClick={() => {
            setIsEjercicioOpen(!isEjercicioOpen);
          }}
        >
          Editar Ejercicios
        </button>
      </div>

      {isRutinaOpen && (
        <Modal isOpen={isRutinaOpen} onClose={() => setIsRutinaOpen(false)}>
          <EditarRutina data={rutina} onClose={() => setIsRutinaOpen(false)} />
        </Modal>
      )}
      {isEjercicioOpen && (
        <Modal
          isOpen={isEjercicioOpen}
          onClose={() => setIsEjercicioOpen(false)}
        >
          <p>Editando Ejercicio de rutina {rutina._id}</p>
        </Modal>
      )}
    </div>
  );
}
