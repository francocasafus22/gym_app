import { Routes, BrowserRouter, Route } from "react-router-dom";

// Páginas admin
import DashboardPage from "./pages/admin/DashboardPage";
import UsuariosPage from "./pages/admin/UsuariosPage";
import RutinasPage from "./pages/admin/RutinasPage";
import MembresiasPage from "./pages/admin/MembresiasPage";
import VentasPage from "./pages/admin/VentasPage";

// Págias user

// Páginas públicas
import LandingPage from "./pages/LandingPage";
import MiMembresiaPage from "./pages/user/MiMembresiaPage";
import MiRutinaPage from "./pages/user/MiRutinaPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/membresias" element={<MembresiasPage />} />
        <Route path="/rutinas" element={<RutinasPage />} />
        <Route path="/ventas" element={<VentasPage />} />
        <Route path="/usuarios" element={<UsuariosPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/mi-membresia" element={<MiMembresiaPage />}></Route>
        <Route
          path="/mi-rutina"
          element={<MiRutinaPage></MiRutinaPage>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
