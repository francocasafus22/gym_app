import { Routes, BrowserRouter, Route } from "react-router-dom";

// Páginas admin
import DashboardPage from "./pages/admin/DashboardPage";
import UsuariosPage from "./pages/admin/UsuariosPage";
import RutinasPage from "./pages/admin/RutinasPage";
import MembresiasPage from "./pages/admin/MembresiasPage";
import VentasPage from "./pages/admin/VentasPage";
import Home from "./pages/publicas/Home"

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />

        <Route path="/membresias" element={<MembresiasPage />} />
        <Route path="/rutinas" element={<RutinasPage />} />
        <Route path="/ventas" element={<VentasPage />} />
        <Route path="/usuarios" element={<UsuariosPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}