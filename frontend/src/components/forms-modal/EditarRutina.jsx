import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import Loading from "../Loading";
import { editRutina } from "../../api/GymAPI";
import { PostRutinaSchema } from "../../schemas/editRutina";

export default function EditarRutina({ data, onClose }) {
  const [nombreInput, setnombreInput] = useState(data.nombre);
  const [descripcionInput, setDescripcionInput] = useState(data.descripcion);
  const [diasInput, setDiasInput] = useState(data.diasPorSemana);
  const [optionTipo, setOptionTipo] = useState(data.tipo);
  const [optionNivel, setOptionNivel] = useState(data.nivel);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: editRutina,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["rutinas"]);

      toast.success(data.message);
      onClose();
    },
    onError: (data) => {
      toast.error(data.error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      nombre: nombreInput,
      descripcion: descripcionInput,
      tipo: optionTipo,
      nivel: optionNivel,
      diasPorSemana: diasInput,
    };

    const result = PostRutinaSchema.safeParse(formData);

    if (!result.success) {
      result.error.issues.map((issue) => toast.error(issue.message));
      return;
    }

    mutate({ rutinaId: data._id, formData });
  };

  const handleInputDescripcion = (e) => {
    if (e.target.value.length <= 255) {
      setDescripcionInput(e.target.value);
    } else {
      setDescripcionInput(e.target.value.slice(0, 255));
    }
  };

  return (
    <form
      className="p-10 flex flex-col gap-2"
      onSubmit={(e) => handleSubmit(e)}
    >
      <h1 className="text-center text-3xl font-bold border-b border-accent pb-2 mb-2">
        Rutina {data.nombre}
      </h1>

      <div className="flex flex-col gap-2">
        <label className="text-md text-start text-gray-400">Nombre</label>

        <input
          type="text"
          id="nombre"
          placeholder="Nombre de la rutina"
          className="w-full border shadow-md border-border p-3 rounded-lg focus:outline-none transition-all duration-200 focus:border-accent "
          name="nombre"
          onChange={(e) => setnombreInput(e.target.value)}
          value={nombreInput}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-md text-gray-400 text-start">Descripcion</label>

        <textarea
          id="descripcion"
          value={descripcionInput}
          placeholder="Descripción de la membresia"
          className="w-full border shadow-md border-border p-3 rounded-lg focus:outline-none transition-all duration-200 focus:border-accent "
          name="descripcion"
          onChange={(e) => handleInputDescripcion(e)}
        />
        <p className="text-start text-zinc-500">
          {descripcionInput.length}/255
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-md text-start text-gray-400">
          Dias por semana
        </label>

        <input
          type="number"
          id="dias"
          placeholder="Dias por semana"
          className="w-full border shadow-md border-border p-3 rounded-lg focus:outline-none transition-all duration-200 focus:border-accent "
          name="dias"
          onChange={(e) => setDiasInput(e.target.value)}
          value={diasInput}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-md text-start text-gray-400">Tipo</label>

        <div className="grid grid-cols-2 gap-2">
          <div
            key={"Plantilla"}
            className={`hover:bg-accent border border-border transition-all duration-200 cursor-pointer rounded-lg p-2 shadow-xl ${optionTipo === "Plantilla" ? "bg-accent" : ""}`}
            onClick={() => setOptionTipo("Plantilla")}
          >
            Plantilla
          </div>
          <div
            key={"Personalizada"}
            className={`hover:bg-accent border border-border transition-all duration-200 cursor-pointer rounded-lg p-2 shadow-xl ${optionTipo === "Personalizada" ? "bg-accent" : ""}`}
            onClick={() => setOptionTipo("Personalizada")}
          >
            Personalizada
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-md text-start text-gray-400">Nivel</label>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div
            key={"Principiante"}
            className={`hover:bg-accent border border-border transition-all duration-200 cursor-pointer rounded-lg p-2 shadow-xl ${optionNivel === "Principiante" ? "bg-accent" : ""}`}
            onClick={() => setOptionNivel("Principiante")}
          >
            Principiante
          </div>
          <div
            key={"Intermedio"}
            className={`hover:bg-accent border border-border transition-all duration-200 cursor-pointer rounded-lg p-2 shadow-xl ${optionNivel === "Intermedio" ? "bg-accent" : ""}`}
            onClick={() => setOptionNivel("Intermedio")}
          >
            Intermedio
          </div>
          <div
            key={"Avanzado"}
            className={`hover:bg-accent border border-border transition-all duration-200 cursor-pointer rounded-lg p-2 shadow-xl ${optionNivel === "Avanzado" ? "bg-accent" : ""}`}
            onClick={() => setOptionNivel("Avanzado")}
          >
            Avanzado
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="bg-accent shadow-2xl hover:brightness-90 transition-all duration-200 w-full p-3 mt-5 rounded-lg text-white font-black  text-xl cursor-pointer"
      >
        {isPending ? <Loading color="white" /> : "Guardar Cambios"}
      </button>
    </form>
  );
}
