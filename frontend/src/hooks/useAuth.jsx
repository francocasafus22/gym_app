import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    console.log("Context no definido");
    throw new Error("useAuth debe ser usado dentro de su provider");
  }

  return context;
}
