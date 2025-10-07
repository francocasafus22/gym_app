import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/GymAPI";
export default function Login() {
  const navigate = useNavigate();
  const { refetch, user } = useAuth();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  // Realiza la petición POST al endpoint de login
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // Si la petición fue exitosa, guarda el token en el localStorage
      if (data?.token) {
        localStorage.setItem("AUTH_TOKEN", data.token);
        refetch();
        // Dependiendo el usuario lo redirige a la pantalla correspondiente
        user?.rol === "administrador" ? navigate("/admin") : navigate("/feed");
      } else {
        console.log("No recibio el token del backend");
      }
    },
    onError: (error) => console.log("Error Login: ", error.message),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailInput;
    const password = passwordInput;
    console.log({ email, password });

    // Realiza la petición POST
    mutation.mutate({ email, password });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen ">
        {/* Lado izquierdo con fondo */}
        <div className=" flex justify-center items-center  border-accent pt-5 md:py-0 ">
          <div
            className=" w-2/4 
           md:w-1/2 overflow-hidden "
          >
            <img
              src="/logoConLetras.png"
              alt="Logo Spartan Gym"
              className="h-auto w-full  object-contain"
            />
          </div>
        </div>

        {/* Lado derecho con contenido */}
        <div className=" px-10 flex md:items-center  bg-gradient-to-b md:bg-gradient-to-r from-primary to-accent">
          <div
            className="w-full
         max-w-2xl mx-auto py-10 md:py-0 "
          >
            <h1 className="font-black text-6xl text-accent-foreground">
              Iniciar sesión
            </h1>
            <p className="text-2xl  text-accent-foreground">
              accede a tu cuenta de{" "}
              <span className="bg-gradient-to-b font-bold from-[#ff0000] to-accent bg-clip-text text-transparent">
                Spartan-Gym
              </span>
            </p>

            <form className="mt-5 flex flex-col gap-2" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-2xl">Email</label>

                <input
                  id="email"
                  type="email"
                  placeholder="Email de Registro"
                  className="w-full border border-gray-300 p-3 rounded-lg"
                  name="email"
                  onChange={(e) => setEmailInput(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-2xl">Password</label>

                <input
                  type="password"
                  placeholder="Password de Registro"
                  className="w-full border border-gray-300 p-3 rounded-lg"
                  name="password"
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
              </div>

              <input
                type="submit"
                value="Iniciar Sesión"
                className="bg-accent shadow-2xl hover:brightness-90 transition-all duration-200 w-full p-3 mt-5 rounded-lg text-white font-black  text-xl cursor-pointer"
              />
              {mutation.error && (
                <p className="text-red-500 text-center mt-2">
                  {mutation.error.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
