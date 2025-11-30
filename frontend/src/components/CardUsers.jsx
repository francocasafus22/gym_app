import { fechaDiaMesAño } from "../utils/formatText";
import { useState } from "react";
import Modal from "./Modal";
import AsignarRutinaForm from "./forms-modal/AsignarRutinaForm";
import RenovarMembresiaForm from "./forms-modal/RenovarMembresiaForm";
import { X } from "lucide-react";
import DeleteUserForm from "./forms-modal/DeleteUserForm";

export default function CardUsers({ user }) {
  const [isOpenRutina, setIsOpenRutina] = useState(false);
  const [isOpenMembresia, setIsOpenMembresia] = useState(false);
  const [isOpenDeleteUser, setIsOpenDeleteUser] = useState(false)

  return (
    <div className="relative flex flex-col text-center  rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 bg-transparent border-1  border-border">
      <button className="absolute right-0 m-2" onClick={()=>setIsOpenDeleteUser(!isOpenDeleteUser)}>
        <X className="hover:text-accent transition-all duration-200 cursor-pointer"/>
      </button>
      <p className="mt-5 text-2xl font-bold">
        {user.firstName} {user.lastName}
      </p>
      <p className="text-xl text-accent">DNI: {user.dni}</p>
      <div className="flex justify-center px-10 py-5">
        <img
          src={user.image || "user-placeholder.jpg"}
          alt="Foto de perfil"
          className="w-32 h-32 rounded-full object-cover shadow-md"
        />
      </div>
      <p>
        Rutina:{" "}
        <span className="text-accent">
          {user.rutina ? user.rutina.nombre : "No tiene rutina"}
        </span>
      </p>
      {user.membresia.length >= 1 ? (
        <>
          <p>
            Fecha vencimiento:{" "}
            <span className="text-accent">
              {fechaDiaMesAño(user.membresia[0].fechaFin)}
            </span>
          </p>
          <p>
            Estado:{" "}
            <span className="text-accent">
              {user.membresia[0]?.estado ? "En pago" : "Vencida"}
            </span>
          </p>
        </>
      ) : (
        <>
          <p className="text-zinc-500 mb-6">No tiene ninguna membresia</p>
        </>
      )}

      <div className="flex flex-row justify-center gap-5 mx-5 ">
        <button
          className="px-6 py-2 w-full my-5 bg-accent text-accent-foreground rounded-lg hover:bg-accent-hover  transition-all duration-200 cursor-pointer"
          onClick={() => {
            setIsOpenMembresia(!isOpenMembresia);
          }}
        >
          Renovar Membresia
        </button>
        <button
          className="px-6 py-2 w-full my-5  bg-accent text-accent-foreground rounded-lg hover:bg-accent-hover  transition-all duration-200 cursor-pointer"
          onClick={() => {
            setIsOpenRutina(!isOpenRutina);
          }}
        >
          Asignar Rutina
        </button>
      </div>
      <p className="text-center mb-2 ml-5">
        Socio desde: {fechaDiaMesAño(user.createdAt)}
      </p>

      {isOpenMembresia && (
        <Modal
          isOpen={isOpenMembresia}
          onClose={() => setIsOpenMembresia(false)}
        >
          {!user.membresia[0]?.estado ? (
            <RenovarMembresiaForm
              user={user}
              onClose={() => setIsOpenMembresia(false)}
            ></RenovarMembresiaForm>
          ) : (
            <p className="p-5 font-bold">Ya tiene membresía activa</p>
          )}
        </Modal>
      )}

      {isOpenDeleteUser && (
        <Modal isOpen={isOpenDeleteUser} onClose={()=>setIsOpenDeleteUser(false)}>
          <DeleteUserForm onClose={()=>setIsOpenDeleteUser(false)} userId={user._id}/>
        </Modal>
      )}

      {isOpenRutina && (
        <Modal isOpen={isOpenRutina} onClose={() => setIsOpenRutina(false)}>
          <AsignarRutinaForm
            userId={user._id}
            onClose={() => setIsOpenRutina(false)}
          ></AsignarRutinaForm>
        </Modal>
      )}
    </div>
  );
}
