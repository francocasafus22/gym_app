import { useState } from "react";
import Modal from "./Modal";
import MembresiaTipoForm from "./forms-modal/MembresiaTipoForm";
import { capitalize } from "../utils/formatText";
import { fechaDiaMesAño } from "../utils/formatText";

export default function MembresiaTipoCard({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-border border shadow-xl h-90 flex flex-col  text-center rounded-3xl">
      <div className="flex flex-col justify-center items-center px-5 h-4/5  rounded-t-3xl w-full">
        <h1 className="text-5xl font-bold">{capitalize(data.nombre)}</h1>
        <p className="text-2xl font-bold mt-2 text-accent ">${data.precio}</p>
        <p className="text-lg font-light mt-2 w-full overflow-hidden">
          {data.descripcion}
        </p>
      </div>
      <p className="text-md font-light text-secondary mb-2">
        Actualizado: {fechaDiaMesAño(data.updatedAt)}
      </p>
      <div className="flex justify-center items-center  h-1/5 rounded-b-3xl">
        <button
          className="px-6 py-2 w-full mx-5 mb-5 bg-accent text-accent-foreground rounded-lg hover:brightness-80  transition-all duration-200 cursor-pointer"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          Editar
        </button>
      </div>

      {isOpen && (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <MembresiaTipoForm data={data} onClose={() => setIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
