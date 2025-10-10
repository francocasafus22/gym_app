import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllMembresiaTipo } from "../api/GymAPI";

export default function useMembresiasTipo() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["membresiasTipo"],
    queryFn: getAllMembresiaTipo,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError, error, refetch };
}
