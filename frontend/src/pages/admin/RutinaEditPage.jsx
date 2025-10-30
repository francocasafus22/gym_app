import { useEffect, useState } from "react";
import { getRutinaBySlug } from "../../api/GymAPI.js";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading.jsx";

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

  if (rutina) {
    console.log(rutina);
  }

  return (
    <div>
      <h1 className="text-center text-3xl  md:text-5xl font-bold mt-10">
        Ejercicios de la rutina{" "}
        <div>
          <span className="text-accent">{rutina.nombre}</span>
        </div>
      </h1>
      <p>{rutina.nombre}</p>
    </div>
  );
}
