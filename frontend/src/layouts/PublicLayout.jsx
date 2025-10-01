import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";

export default function PublicLayout() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div>
      <Header isLogin={isLogin} setIsLogin={setIsLogin} isAdmin={false} />

      <Outlet />
    </div>
  );
}
