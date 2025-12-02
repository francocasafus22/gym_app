import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllRutinas, asignarRutina } from "../../api/GymAPI";
import { useState } from "react";
import Loading from "../../components/Loading";
import { toast } from "sonner";

export default function AsignarRutinaForm({ userId, onClose }) {
  const [option, setOption] = useState(null);
  const queryClient = useQueryClient();

  const {
    data: rutinas,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["rutinas", userId],
    queryFn: getAllRutinas,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: asignarRutina,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["users"]);
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = () => {
    if (!option) return toast.error("Selecciona una rutina");
    mutate({ userId, rutinaId: option });
  };

  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold border-b-2 border-accent pb-2 mb-5">
        Rutinas
      </h1>
      {isLoading && <Loading/>}
      {isError && <p>Error loading rutinas</p>}
      <div className="flex flex-col gap-2">
        {rutinas &&
          rutinas.map((rutina) => (
            <div
              key={rutina._id}
              className={`hover:bg-accent border border-border transition-all duration-200 cursor-pointer rounded-lg p-2 shadow-xl ${option === rutina._id ? "bg-accent text-accent-foreground" : ""}`}
              onClick={() => setOption(rutina._id)}
            >
              {rutina.nombre}
            </div>
          ))}
      </div>
      <button
        className="bg-accent text-xl font-bold w-full rounded-lg mt-5 py-2 cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-200 hover:brightness-85 text-accent-foreground"
        onClick={() => handleSubmit()}
      >
        {isPending ? <Loading color="accent-foreground"/> : "Asignar"}
      </button>
    </div>
  );
}
