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
import FeedPage from "./pages/user/FeedPage";
import AppLayout from "./layouts/ProtectedLayout";
import PublicLayout from "./layouts/PublicLayout";
import LoginPage from "./pages/publicas/LoginPage";
import ProtectedLayout from "./layouts/ProtectedLayout";

export default function Router() {
  return (
    <Routes>
      {/* Página principal */}

      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="/auth/login" element={<LoginPage />}></Route>

      <Route element={<ProtectedLayout roles={["administrador"]} />}>
        {/* Admin */}
        <Route path="/membresias" element={<MembresiasPage />} />
        <Route path="/rutinas" element={<RutinasPage />} />
        <Route path="/ventas" element={<VentasPage />} />
        <Route path="/usuarios" element={<UsuariosPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
      {/* Usuario */}

      <Route element={<ProtectedLayout roles={["usuario", "administrador"]} />}>
        <Route path="/mi-membresia" element={<MiMembresiaPage />} />
        <Route path="/mi-rutina" element={<MiRutinaPage />} />
        <Route path="/feed" element={<FeedPage />}></Route>
      </Route>
    </Routes>
  );
}
