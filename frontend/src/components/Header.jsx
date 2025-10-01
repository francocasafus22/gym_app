import { Link, useLocation } from "react-router-dom";
import { X, Menu } from "lucide-react";
import { useState } from "react";
import Logo from "./Logo";

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Falta añadir los admin y user navigation
  const tabs = [
    { name: "Home", href: "/" },
    { name: "Membresía", href: "/mi-membresia" },
    { name: "Rutina", href: "/mi-rutina" },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <header className="shadow-md w-full py-3 bg-transparent border-b border-border">
      <div className="flex items-center justify-between px-5">
        {/* Logo */}
        <div className="flex items-center fixed space-x-2">
          <Logo />
          <span className="text-2xl font-bold text-accent">Spartan Gym</span>
        </div>

        {/* Links del nav*/}
        <nav className="hidden md:flex gap-3  mx-auto">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              to={tab.href}
              className={classNames(
                location.pathname === tab.href
                  ? "bg-accent text-accent-foreground py-2 px-5 rounded-lg transition"
                  : " hover:bg-accent hover:text-primary-foreground py-2 px-5 rounded-lg transition"
              )}
            >
              {tab.name}
            </Link>
          ))}
        </nav>

        {/* Toggle menú celular */}
        <div className="md:hidden flex items-center justify-end mr-5 gap-3 ml-auto hover:text-accent transition-colors duration-150 ease-in-out">
          {/* Botón menú */}
          <button className=" z-50 " onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Menú desplegable de celular */}
        <div
          className={`md:hidden fixed top-16 left-2 right-2 bg-black/20 backdrop-blur-xl shadow-lg rounded-lg p-4 flex flex-col gap-2 transition-all duration-300 ease-in-out ${
            open
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              to={tab.href}
              className="hover:bg-accent py-2 px-5 rounded-lg transition"
              onClick={() => setOpen(false)} // cierra el menú al hacer click
            >
              {tab.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
