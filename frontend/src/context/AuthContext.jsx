import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/GymAPI";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

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
    localStorage.removeItem("AUTH_TOKEN");

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
