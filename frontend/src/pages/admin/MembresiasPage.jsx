import React from "react";
import { Plus } from "lucide-react";

const MembresiasPage = () => {
  // TODO: Hacer peticion al backend con las membriasTipo y renderizarlas y agregar funcionalidad al editar y agregar
  return (
    <div className="min-h-screen  p-10 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-10 pb-5 border-b border-accent">
        Membresias
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
        <div className="bg-zinc-800 shadow-2xl h-90 flex flex-col  text-center rounded-3xl">
          <div className="flex flex-col justify-center items-center px-5 h-4/5  rounded-t-3xl">
            <h1 className="text-5xl font-bold">Mensual</h1>
            <p className="text-2xl font-bold mt-2 text-accent ">$20000</p>
            <p className="text-lg font-light mt-2  overflow-hidden">
              Plan mensual con descuento del 25% por año nuevo
            </p>
          </div>

          <div className="flex justify-center items-center  h-1/5 rounded-b-3xl">
            <button className="px-6 py-2 w-full mx-5 mb-5 bg-accent text-accent-foreground rounded-lg hover:brightness-80  transition-all duration-200 cursor-pointer">
              Editar
            </button>
          </div>
        </div>

        <div className="bg-zinc-800 shadow-2xl h-90 flex flex-col  text-center rounded-3xl">
          <div className="flex flex-col justify-center items-center h-4/5  p-5 rounded-t-3xl">
            <h1 className="text-5xl font-bold">Trimestral</h1>
            <p className="text-2xl font-bold mt-2 text-accent ">$50000</p>
            <p className="text-lg font-light mt-2 overflow-hidden">
              Plan trimestral sin descuento
            </p>
          </div>

          <div className="flex justify-center items-center  h-1/5 rounded-b-3xl">
            <button className="px-6 py-2 w-full mx-5 mb-5 bg-accent text-accent-foreground rounded-lg hover:brightness-80  transition-all duration-200 cursor-pointer">
              Editar
            </button>
          </div>
        </div>
        <div className="bg-zinc-800   shadow-2xl h-90 flex flex-col  text-center rounded-3xl">
          <div className="flex flex-col justify-center items-center h-4/5  p-5 rounded-t-3xl">
            <h1 className="text-5xl font-bold">Anual</h1>
            <p className="text-2xl font-bold mt-2 text-accent ">$100000</p>
            <p className="text-lg font-light mt-2 overflow-hidden">
              Plan anual el mejor precio, el mas comprado.
            </p>
          </div>

          <div className="flex justify-center items-center  h-1/5 rounded-b-3xl">
            <button className="px-6 py-2 w-full mx-5 mb-5 bg-accent text-accent-foreground rounded-lg hover:brightness-80  transition-all duration-200 cursor-pointer">
              Editar
            </button>
          </div>
        </div>

        <button className="bg-zinc-800 shadow-2xl h-90 flex flex-col  text-center rounded-3xl hover:brightness-90 cursor-pointer transition-all duration-300 ease-in-out">
          <div className="flex flex-col justify-center items-center h-full p-5 rounded-t-3xl ">
            <Plus size={100} strokeWidth={1} className="text-accent" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default MembresiasPage;
