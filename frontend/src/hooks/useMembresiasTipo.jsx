import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllMembresiaTipo } from "../api/GymAPI";

export default function useMembresiasTipo() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["membresiasTipo"],
    queryFn: getAllMembresiaTipo,
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60 * 24,
    refetchOnReconnect: false,
  });

  return { data, isLoading, isError, error, refetch };
}
