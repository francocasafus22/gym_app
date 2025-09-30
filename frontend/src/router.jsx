import { Routes, BrowserRouter, Route } from "react-router-dom";

// Páginas admin
import DashboardPage from "./pages/admin/DashboardPage";
import UsuariosPage from "./pages/admin/UsuariosPage";
import RutinasPage from "./pages/admin/RutinasPage";
import MembresiasPage from "./pages/admin/MembresiasPage";
import VentasPage from "./pages/admin/VentasPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/membresias" element={<MembresiasPage />} />
        <Route path="/rutinas" element={<RutinasPage />} />
        <Route path="/ventas" element={<VentasPage />} />
        <Route path="/usuarios" element={<UsuariosPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}