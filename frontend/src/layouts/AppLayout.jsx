import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";

export default function AppLayout() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <div>
      <Header isLogin={isLogin} isAdmin={isAdmin} setIsLogin={setIsLogin} />
      <Outlet />
    </div>
  );
}
