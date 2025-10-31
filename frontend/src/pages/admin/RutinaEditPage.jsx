import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRutinaBySlug } from "../../api/GymAPI";
import Loading from "../../components/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import EjercicioCard from "../../components/EjercicioCard";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function RutinaEditPage() {
  const { slug } = useParams();

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
          <>
            <p className="text-2xl font-bold mt-6 mb-3">Día {dia}</p>
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={20}
              slidesPerView={1}
              grabCursor={true}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {rutina.ejercicios
                .filter((ejercicio) => ejercicio.dia === dia)
                .map((ejercicio) => (
                  <SwiperSlide key={ejercicio.id}>
                    <EjercicioCard key={ejercicio.id} ejercicio={ejercicio} />
                  </SwiperSlide>
                ))}
            </Swiper>
          </>
        ),
      )}
    </div>
  );
}
