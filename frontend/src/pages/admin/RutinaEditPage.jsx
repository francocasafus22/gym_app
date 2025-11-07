import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRutinaBySlug } from "../../api/GymAPI";
import { Plus } from "lucide-react";
import Loading from "../../components/Loading";
import DeleteEjercicioForm from "../../components/forms-modal/DeleteEjercicioForm.jsx";
import EjercicioCard from "../../components/EjercicioCard";
import AsignarEjercicioForm from "../../components/forms-modal/AsignarEjercicioForm.jsx";
import Modal from "../../components/Modal";
import { useState } from "react";

export default function RutinaEditPage() {
  const { slug } = useParams();
  const [dia, setDia] = useState(null);
  const [isOpenAddRutina, setIsOpenAddRutina] = useState(false);
  const [isOpenDeleteEjercicio, setIsOpenDeleteEjercicio] = useState(false);

  const dias_semana = {
    1: "Lunes",
    2: "Martes",
    3: "Miércoles",
    4: "Jueves",
    5: "Viernes",
    6: "Sábado",
  };

  const {
    data: rutina,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["rutina", slug],
    queryFn: () => getRutinaBySlug(slug),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const handleOpenAddEjercicio = (dia) => {
    setIsOpenAddRutina(true);
    setDia(dia);
  };

  if (isPending)
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <Loading />
      </div>
    );

  if (isError)
    return (
      <div className="h-[80vh] flex items-center justify-center text-red-500">
        Error al cargar la rutina.
      </div>
    );

  return (
    <div className="px-5 pb-10">
      <h1 className="text-center text-3xl md:text-5xl font-bold mt-10">
        Ejercicios de la rutina{" "}
        <span className="text-accent block mt-2">{rutina.nombre}</span>
      </h1>

      {Array.from({ length: rutina.diasPorSemana }, (_, i) => i + 1).map(
        (dia) => (
          <div key={dia}>
            <p className="text-2xl font-bold mt-6 mb-3">
              Día {dias_semana[dia]}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
              {rutina.ejercicios
                .filter((ejercicio) => ejercicio.dia === dia)
                .map((ejercicio) => (
                  <EjercicioCard
                    key={ejercicio._id}
                    ejercicio={ejercicio}
                    setIsOpenDeleteEjercicio={setIsOpenDeleteEjercicio}
                  />
                ))}{" "}
              <button className="border border-border shadow-xl hover:shadow-2xl h-80 flex flex-col  text-center rounded-3xl hover:brightness-90 cursor-pointer transition-all duration-300 ease-in-out">
                <div
                  className="flex flex-col justify-center items-center h-full p-5 rounded-t-3xl"
                  onClick={() => handleOpenAddEjercicio(dia)}
                >
                  <Plus size={100} strokeWidth={1} className="text-accent" />
                </div>
              </button>
            </div>
          </div>
        ),
      )}

      {isOpenDeleteEjercicio && (
        <Modal
          isOpen={isOpenDeleteEjercicio}
          onClose={() => setIsOpenDeleteEjercicio(null)}
        >
          <DeleteEjercicioForm
            ejercicioId={isOpenDeleteEjercicio}
            onClose={() => setIsOpenDeleteEjercicio(null)}
            rutinaId={rutina._id}
          />
        </Modal>
      )}

      {isOpenAddRutina && (
        <Modal
          isOpen={isOpenAddRutina}
          onClose={() => setIsOpenAddRutina(false)}
        >
          <AsignarEjercicioForm
            rutinaId={rutina._id}
            dia={dia}
            onClose={() => setIsOpenAddRutina(false)}
          />
        </Modal>
      )}
    </div>
  );
}
