import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser } from "../api/GymAPI";
import { toast } from "sonner";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    refetchOnWindowFocus: false,
    // Solo activado si hay un token
    enabled: !!localStorage.getItem("AUTH_TOKEN"),
  });

  const logout = () => {
    // TODO: CUANDO CIERRO SESIÓN Y VA A / ME DEVUELVE A FEED
    localStorage.removeItem("AUTH_TOKEN");
    // Borra el user cacheado
    queryClient.removeQueries(["user"]);
    toast.success("Sesion cerrada con exito");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isError, refetch, error, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
