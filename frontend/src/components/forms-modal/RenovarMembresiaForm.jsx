import { useMutation, useQueryClient } from "@tanstack/react-query";
import useMembresiasTipo from "../../hooks/useMembresiasTipo";
import { asignarMembresia } from "../../api/GymAPI";
import { toast } from "sonner";
import { capitalize } from "../../utils/formatText";

import { useState } from "react";
import Loading from "../Loading";

export default function RenovarMembresiaForm({ user, onClose }) {
  const { data, isLoading } = useMembresiasTipo();
  const [option, setOption] = useState();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: asignarMembresia,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["users"] }); // Actualiza los usuarios
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!option) return toast.error("Selecciona una membresía");
    mutate({ userId: user._id, membresiaId: option });
  };

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <form className="p-10 flex flex-col gap-2" onSubmit={handleSubmit}>
      <h1 className="text-center text-3xl font-bold border-b border-accent pb-2 mb-2">
        Tipos de Membresia
      </h1>

      <div className="flex flex-col ">
        <ul className="flex flex-col gap-5 mt-2">
          {data.map((membresia) => (
            <li
              className={`text-xl border border-border text-center rounded-md py-2 hover:bg-accent transition-all duration-300 cursor-pointer ${option === membresia._id ? "bg-accent" : null}`}
              onClick={() => {
                setOption(membresia._id);
              }}
              key={membresia._id}
            >
              {capitalize(membresia.nombre)} - ${membresia.precio}
            </li>
          ))}
        </ul>
      </div>
      <button
        type="submit"
        className="bg-accent shadow-2xl hover:brightness-90 transition-all duration-200 w-full p-3 mt-5 rounded-lg text-white font-black  text-xl cursor-pointer"
      >
        {isPending ? <Loading /> : "Asignar Membresia"}
      </button>
    </form>
  );
}
