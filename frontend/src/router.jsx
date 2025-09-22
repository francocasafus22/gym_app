import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import Tienda from "./pages/Tienda";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/perfil" element={<Perfil></Perfil>}></Route>
        <Route path="/tienda" element={<Tienda></Tienda>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
