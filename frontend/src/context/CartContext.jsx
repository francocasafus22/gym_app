import { useEffect } from "react";
import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("CART_ITEMS") || "[]"));

  const addProduct = (producto) => {
    const existing = JSON.parse(localStorage.getItem("CART_ITEMS")) || [];

        // Buscar si el producto ya existe
        const index = existing.findIndex(p => p.productId === producto._id);

        if (index === -1) {
            // No existe, lo agrego con cantidad 1
            existing.push({ productId: producto._id, nombre: producto.nombre, precio: producto.precio, quantity: 1 });
        } else {
            // Ya existe, aumento la cantidad
            existing[index].quantity += 1;
        }

    // Guardar el array actualizado
    localStorage.setItem("CART_ITEMS", JSON.stringify(existing));
    setCart(existing)
  };

  const deleteProduct = (producto) => {
    const existing = JSON.parse(localStorage.getItem("CART_ITEMS")) || [];

      const updated = existing.filter(p => p.productId !== producto.productId);

    localStorage.setItem("CART_ITEMS", JSON.stringify(updated));
    setCart(updated);
  };

    const clearCart = () => {
      localStorage.removeItem("CART_ITEMS")
    }
  return (
    <CartContext.Provider
      value={{ cart, addProduct, deleteProduct, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
