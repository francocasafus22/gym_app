import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";

export default function PublicLayout() {
  return (
    <div>
      <Header />

      <Outlet />
    </div>
  );
}
