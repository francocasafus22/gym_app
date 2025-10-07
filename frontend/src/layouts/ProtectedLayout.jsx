import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
export default function ProtectedLayout({ roles }) {
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  // Redireccionar según si está logeado o el rol
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        //Si no está logueado lo redirige a la pantalla de login
        navigate("/auth/login");
      } else if (roles && !roles.includes(user.rol)) {
        // En el caso de que el rol sea usuario y quiera acceder a la pantalla de admin lo redirige al feed
        navigate("/feed");
      }
    }
  }, [user, roles, navigate, isLoading]);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );

  // Si el user no existe o el rol no coincide no renderizar nada, para evitar que se vea el panel de admin al redirigir
  if (!user || (roles && !roles.includes(user.rol))) return null;

  return (
    <div>
      <Header user={user} logout={logout} />
      {/* Se le pasa el user al outlet */}
      <Outlet context={{ user }} />
    </div>
  );
}
