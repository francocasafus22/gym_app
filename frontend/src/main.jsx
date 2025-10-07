import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import "./index.css";
import Router from "./router";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
      <Toaster richColors />
    </BrowserRouter>
  </QueryClientProvider>
);
