import { Search } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Loading from "../Loading";
import { deleteExerciseInRutina } from "../../api/GymAPI.js";

export default function AsignarEjercicioForm({
  onClose,
  rutinaId,
  ejercicioId,
}) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteExerciseInRutina,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["rutina"]);
      toast.success(data.message);
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = () => {
    mutate({ rutinaId, ejercicioId });
  };

  return (
    <>
      <div className="p-10 flex flex-col gap-5">
        <h1 className="text-center text-xl font-bold ">
          ¿Estás seguro de eliminar este ejercicio?
        </h1>
        <button
          onClick={handleSubmit}
          className="border-accent border hover:bg-accent cursor-pointer transition-all duration-300 ease-in-out rounded-lg py-2"
        >
          {isPending ? <Loading color="white" /> : "Eliminar"}
        </button>
      </div>
    </>
  );
}
