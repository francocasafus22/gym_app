import { Routes, BrowserRouter, Route } from "react-router-dom";

// Páginas admin
import DashboardPage from "./pages/admin/DashboardPage";
import UsuariosPage from "./pages/admin/UsuariosPage";
import RutinasPage from "./pages/admin/RutinasPage";
import MembresiasPage from "./pages/admin/MembresiasPage";
import VentasPage from "./pages/admin/VentasPage";
import Home from "./pages/publicas/Home";

// Páginas públicas
import LandingPage from "./pages/LandingPage";

// Páginas user
import MiMembresiaPage from "./pages/user/MiMembresiaPage";
import MiRutinaPage from "./pages/user/MiRutinaPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />

        {/* Admin */}
        <Route path="/membresias" element={<MembresiasPage />} />
        <Route path="/rutinas" element={<RutinasPage />} />
        <Route path="/ventas" element={<VentasPage />} />
        <Route path="/usuarios" element={<UsuariosPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Usuario */}
        <Route path="/mi-membresia" element={<MiMembresiaPage />} />
        <Route path="/mi-rutina" element={<MiRutinaPage />} />
      </Routes>
    </BrowserRouter>
  );
}