import { Link } from "react-router-dom";
import Logo from "../../components/Logo";
export default function Login() {
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

            <form className="mt-5 flex flex-col gap-2" noValidate>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-2xl">Email</label>

                <input
                  id="email"
                  type="email"
                  placeholder="Email de Registro"
                  className="w-full border border-gray-300 p-3 rounded-lg"
                  name="email"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-2xl">Password</label>

                <input
                  type="password"
                  placeholder="Password de Registro"
                  className="w-full border border-gray-300 p-3 rounded-lg"
                  name="password"
                />
              </div>

              <input
                type="submit"
                value="Iniciar Sesión"
                className="bg-accent shadow-2xl hover:brightness-90 transition-all duration-200 w-full p-3 mt-5 rounded-lg text-white font-black  text-xl cursor-pointer"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
