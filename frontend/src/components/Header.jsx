import { Link, useLocation, useNavigate } from "react-router-dom";
import { X, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import UserNavigation from "./nav/UserNavigation";
import AdminNavigation from "./nav/AdminNavigation";

export default function Header({ user = null, logout }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin] = useState(user ? true : false);
  const [isAdmin] = useState(user?.rol === "administrador" ? true : false);

  const isLandingPage = location.pathname === "/";

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleAuthButton = () => {
    isLogin ? logout() : navigate("/auth/login");
  };

  return (
    <header className="shadow-md w-full py-3 bg-transparent border-b border-border">
      <div className="flex items-center justify-between px-5">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Logo />
          <span className="text-2xl font-bold text-accent">Spartan Gym</span>
        </div>

        {/* Links del nav */}
        {!isLandingPage || isLogin ? (
          <nav className="hidden lg:flex gap-3 mx-auto">
            {user.rol === "administrador" ? (
              <AdminNavigation />
            ) : (
              <UserNavigation />
            )}
          </nav>
        ) : null}

        {/* Botón Login/Logout */}
        <div>
          <button
            className="px-5 py-2  bg-accent rounded-lg text-accent-foreground hover:bg-accent transition-all duration-300 cursor-pointer hidden lg:block"
            onClick={handleAuthButton}
          >
            {isLogin ? "Cerrar Sesión" : "Iniciar Sesión"}
          </button>
        </div>

        {/* Toggle menú celular */}
        <div className="lg:hidden flex items-center justify-end mr-5 gap-3 ml-auto hover:text-accent transition-colors duration-150 ease-in-out">
          <button className="z-50" onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Menú desplegable móvil */}
        <div
          className={`lg:hidden fixed z-150 top-20 left-2 right-2 bg-primary shadow-lg rounded-lg p-4 flex flex-col gap-2 transition-all duration-300 ease-in-out ${
            open
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          {!isLandingPage &&
            (isAdmin ? <AdminNavigation /> : <UserNavigation />)}

          <button
            className="px-5 py-2 border-2 border-accent rounded-lg text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 cursor-pointer"
            onClick={() => handleAuthButton()}
          >
            {isLogin ? "Cerrar Sesión" : "Iniciar Sesión"}
          </button>
        </div>
      </div>
    </header>
  );
}
