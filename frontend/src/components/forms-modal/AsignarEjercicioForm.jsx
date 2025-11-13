import { useState } from "react";
import { Search } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getByName, addEjercicioToRutina } from "../../api/GymAPI";
import { assignExerciseSchema } from "../../schemas/assignExercise.js";
import { toast } from "sonner";
import Loading from "../Loading";
import Pagination from "../Pagination.jsx";

export default function AsignarEjercicioForm({ onClose, rutinaId, dia }) {
  const [seriesInput, setSeriesInput] = useState("");
  const [repsInput, setRepsInput] = useState("");
  const [descansoInput, setDescansoInput] = useState("");
  const [queryInput, setQueryInput] = useState("");
  const [ejercicioSelected, setEjercicioSelected] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["ejercicios", currentPage],
    queryFn: () => getByName(queryInput, currentPage),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: addEjercicioToRutina,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["rutina"]);
      toast.success(data.message);
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      series: Number(seriesInput),
      repeticiones: Number(repsInput),
      descanso: Number(descansoInput),
      dia,
    };

    const result = assignExerciseSchema.safeParse({
      ejercicioId: ejercicioSelected,
      rutinaId,
      formData,
    });

    if (!result.success) {
      result.error.issues.map((issue) => toast.error(issue.message));
      return;
    }

    mutate({ rutinaId, ejercicioId: ejercicioSelected, formData });
  };

  return (
    <>
      <div className="p-10 flex flex-col">
        <h1 className="text-center text-3xl font-bold border-b border-accent pb-2 mb-2">
          Asignar Ejercicio
        </h1>

        <form
          className="flex flex-row items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            refetch();
          }}
        >
          <Search className="text-secondary" />
          <input
            type="text"
            placeholder="Busqueda por nombre del ejercicio"
            className="flex-1 w-full bg-transparent outline-none flex items-center my-5 px-3 py-2 gap-2 rounded-xl border border-border focus-within:ring-2 focus-within:ring-accent"
            onChange={(e) => setQueryInput(e.target.value)}
            value={queryInput}
          />
          <button
            className="bg-accent text-accent-foreground rounded-xl w-1/4 py-2 hover:brightness-90 transition-all duration-150 cursor-pointer "
            type="submit"
          >
            Buscar
          </button>
        </form>

        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-5">
              {data.ejercicios.map((ejercicio) => (
                <div
                  className={`border border-border ${ejercicioSelected === ejercicio._id ? "bg-accent" : ""} hover:border-accent transition-all duration-200 cursor-pointer rounded-lg p-2 flex justify-center items-center text-center`}
                  key={ejercicio._id}
                  onClick={() => setEjercicioSelected(ejercicio._id)}
                >
                  <label className="pointer-events-none text-md  text-gray-400">
                    {ejercicio.nombre}
                  </label>
                </div>
              ))}
            </div>
            <Pagination
              currentPage={data.currentPage}
              totalPages={data.totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>
        )}

        <form
          className="flex flex-col gap-2 mt-2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex flex-col gap-2">
            <label className="text-md text-start text-gray-400">Series</label>

            <input
              type="number"
              id="series"
              placeholder="Cantidad de series del ejercicio"
              className="w-full border shadow-md border-border p-3 rounded-lg focus:outline-none transition-all duration-200 focus:border-accent "
              name="series"
              onChange={(e) => setSeriesInput(e.target.value)}
              value={seriesInput}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-md text-start text-gray-400">
              Repeticiones
            </label>
            <input
              type="number"
              id="reps"
              placeholder="Cantidad de repeticiones del ejercicio"
              className="w-full border shadow-md border-border p-3 rounded-lg focus:outline-none transition-all duration-200 focus:border-accent "
              name="reps"
              onChange={(e) => setRepsInput(e.target.value)}
              value={repsInput}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-md text-start text-gray-400">
              Descanso (minutos)
            </label>
            <input
              type="number"
              id="descanso"
              placeholder="Minutos de descanso entre series"
              className="w-full border shadow-md border-border p-3 rounded-lg focus:outline-none transition-all duration-200 focus:border-accent "
              name="descanso"
              onChange={(e) => setDescansoInput(e.target.value)}
              value={descansoInput}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-accent shadow-2xl hover:brightness-90 transition-all duration-200 w-full p-3 mt-5 rounded-lg text-white font-black  text-xl cursor-pointer"
          >
            {isPending ? <Loading color="white" /> : "Asignar Ejercicio"}
          </button>
        </form>
      </div>
    </>
  );
}
