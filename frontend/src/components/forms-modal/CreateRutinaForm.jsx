import InputForm from "../ui/InputForm";
import { useState } from "react";
import Options from "../ui/Options";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRutina } from "../../api/GymAPI";
import { toast } from "sonner";
import { PostRutinaSchema } from "../../schemas/editRutina";
import { useForm } from "react-hook-form";

export default function CreateRutinaForm({ onClose }) {
  const {register, handleSubmit} = useForm()
  const [nivel, setNivel] = useState(null);
  const [tipo, setTipo] = useState(null);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createRutina,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["rutinas"]);
      toast.success(data.message);
      onClose();
    },
    onError: (data) => {
      toast.error(data.error);
    },
  });

  const onSubmit = (data) => {    
    const formData = {
      ...data,
      nivel,
      tipo,      
      activo: true,
    };

    const result = PostRutinaSchema.safeParse(formData);
    if (!result.success) {
      result.error.issues.map((issue) => toast.error(issue.message));
      return;
    }

    mutate(formData);
  };

  return (
    <form
      className="p-10 flex flex-col gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-center text-3xl font-bold border-b border-accent pb-2 mb-2">
        Crear Rutina
      </h1>

      <InputForm
        label={"Nombre"}
        id={"nombre"}
        name={"nombre"}
        placeholder={"Nombre de la rutina"}
        register={register}
        required={true}
        type="text"
      ></InputForm>

      <InputForm
        label={"Descripción"}
        id={"descripcion"}
        placeholder={"Descripción de la rutina"}
        register={register}
        name={"descripcion"}
        required={true}
        type="text"
      ></InputForm>

      <InputForm
        label={"Días"}
        id={"diasPorSemana"}        
        placeholder={"Dias por semana"}
        register={register}
        name={"diasPorSemana"}
        required={true}
        type="number"
      ></InputForm>

      <Options
        label={"Tipo"}
        setOption={setTipo}
        value={tipo}
        options={["Plantilla", "Personalizada"]}
        length={2}
      ></Options>

      <Options
        label={"Nivel"}
        setOption={setNivel}
        value={nivel}
        options={["Principiante", "Intermedio", "Avanzado"]}
        length={3}
      ></Options>

      <button
        type="submit"
        className="bg-accent shadow-2xl hover:brightness-90 transition-all duration-200 w-full p-3 mt-5 rounded-lg text-white font-black  text-xl cursor-pointer"
      >
        Crear Rutina
      </button>
    </form>
  );
}
