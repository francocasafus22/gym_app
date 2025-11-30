import { useState } from "react";
import { NuevoUsuarioSchema } from "../../schemas/nuevoUsuario.js";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createUser } from "../../api/GymAPI.js";
import { toast } from "sonner";
import ErrorMessage from "../ErrorMessage.jsx";

export default function NuevoUsuarioForm({ onClose }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["users"]);
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
      firstName: nombre,
      lastName: apellido,
      dni,
      email
    };

    const result = NuevoUsuarioSchema.safeParse(formData);

    if (!result.success) {
      result.error.issues.map((issue) => toast.error(issue.message));
      return;
    }

    mutate({...formData, password:result.data.dni});
  };

  return (
    <form
      className="p-10 flex flex-col gap-2"
      onSubmit={(e) => handleSubmit(e)}
    >
      <h1 className="text-center text-3xl font-bold border-b border-accent pb-2 mb-2">
        Nuevo Usuario
      </h1>

      <div className="flex flex-col gap-2">
        <div className="relative">
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder=" "
            className="peer border border-border rounded-md w-full py-4 px-3 focus:outline-none focus:border-accent"
          />
          <label
            className={`absolute left-3 transition-all
              ${nombre ? "top-1 text-gray-400 text-xs" : "top-4 text-gray-400 text-base"}
            `}
          >
            Nombre
          </label>
        </div>

        <div className="relative">
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            placeholder=" "
            className="peer border border-border rounded-md w-full py-4 px-3 focus:outline-none focus:border-accent"
          />
          <label
            className={`absolute left-3 transition-all
              ${apellido ? "top-1 text-gray-400 text-xs" : "top-4 text-gray-400 text-base"}
            `}
          >
            Apellido
          </label>
        </div>

        <div className="relative">
          <input
            type="number"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            placeholder=" "
            className="peer border border-border rounded-md w-full py-4 px-3 focus:outline-none focus:border-accent"
          />
          <label
            className={`absolute left-3 transition-all
              ${dni ? "top-1 text-xs text-gray-400" : "top-4 text-gray-400 text-base"}
            `}
          >
            DNI
          </label>
        </div>

        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            className="peer border border-border rounded-md w-full py-4 px-3 focus:outline-none focus:border-accent"
          />
          <label
            className={`absolute left-3 transition-all
              ${email ? "top-1 text-gray-400 text-xs" : "top-4 text-gray-400 text-base"}
            `}
          >
            Email
          </label>
        </div>

        <p className="font-light text-zinc-600">La contraseña será el DNI</p>
        <ul className="flex flex-col gap-5 mt-2">
          {/*data.map((membresia) => (
            <li
              className={`text-xl border border-border text-center rounded-md py-2 hover:bg-accent transition-all duration-300 cursor-pointer ${option === membresia._id ? "bg-accent" : null}`}
              onClick={() => {
                setOption(membresia._id);
              }}
              key={membresia._id}
            >
              {capitalize(membresia.nombre)} - ${membresia.precio}
            </li>
          ))*/}
        </ul>
      </div>
      <button
        type="submit"
        className="bg-accent shadow-2xl hover:brightness-90 transition-all duration-200 w-full p-3 mt-5 rounded-lg text-white font-black  text-xl cursor-pointer"
      >
        {"Crear Usuario"}
      </button>
    </form>
  );
}
