import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import "./index.css";
import Router from "./router";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CartProvider } from "./context/CartContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Router />
        </CartProvider>
      </AuthProvider>
      <Toaster richColors position="top-right" />
    </BrowserRouter>
    <ReactQueryDevtools />
  </QueryClientProvider>,
);
