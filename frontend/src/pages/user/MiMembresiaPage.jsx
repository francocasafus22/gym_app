import Header from "../../components/Header";
import { useOutletContext } from "react-router-dom";
import { fechaDiaMesAño, capitalize } from "../../utils/formatText.js";

export default function MiMembresiaPage() {
  const { user } = useOutletContext();
  const cantidadMembresias = user.membresia.length;

  if (!user.membresia[0])
    return (
      <div className="flex h-[80vh] items-center justify-center ">
        <p className="text-placeholder text-xl">No tienes una membresia</p>
      </div>
    );

  return (
    <div className="min-h-screen container p-10 max-w-7xl mx-auto">
      <h1 className="text-center text-5xl font-bold border-b-3 border-accent pb-5">
        Mis Membresias
      </h1>
      <div className="flex flex-col md:flex-row justify-center text-center md:gap-5 pt-5 font-bold">
        <p>
          Estado de tu membresia:{" "}
          <span className="text-accent">
            {user.membresia[0].estado ? "Activa" : "Vencida"}
          </span>
        </p>
        <p>
          Fecha de vencimiento:{" "}
          <span className="text-accent">
            {fechaDiaMesAño(user.membresia[0].fechaFin)}
          </span>
        </p>
        <p>
          Meses inscripto:{" "}
          <span className="text-accent">{cantidadMembresias}</span>
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-10">
        {user.membresia.map((membresia) => (
          <div className="border border-border shadow-2xl h-90 flex flex-col text-center rounded-3xl">
            <div className="flex flex-col justify-center items-center h-full rounded-t-3xl w-full gap-5">
              <div className="flex flex-col">
                <h1 className="text-5xl font-bold">
                  {capitalize(membresia.tipo.nombre)}
                </h1>
                <p className="text-2xl font-bold text-accent ">
                  {user.firstName + " " + user.lastName}
                </p>

                <p className="text-md font-bold text-zinc-700">
                  DNI: {user.dni}
                </p>
              </div>

              <div className="flex flex-col">
                <p className="text-md font-bold text-gray-400">
                  Fecha Inicio:{" "}
                  <span className="text-accent">
                    {fechaDiaMesAño(membresia.updatedAt)}
                  </span>
                </p>
                <p className="text-md font-bold  text-gray-400">
                  Vencimiento:{" "}
                  <span className="text-accent">
                    {fechaDiaMesAño(membresia.updatedAt)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
