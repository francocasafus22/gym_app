import { useEffect } from "react";
import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

    const [cart, setCart] = useState(
      JSON.parse(localStorage.getItem("CART_ITEMS") || "[]")
    );

    useEffect(()=>{
      setCart(JSON.parse(localStorage.getItem("CART_ITEMS") || "[]"))
    }, [cart])

    const addProduct = (producto) => {
        const existing = JSON.parse(localStorage.getItem("CART_ITEMS")) || [];

        // Buscar si el producto ya existe
        const index = existing.findIndex(p => p.producto === producto._id);

        if (index === -1) {
            // No existe, lo agrego con cantidad 1
            existing.push({ producto: producto._id, nombre: producto.nombre, precio: producto.precio, cantidad: 1, total: producto.precio });
        } else {
            // Ya existe, aumento la cantidad
            existing[index].total += existing[index].precio;
            existing[index].cantidad += 1;            
        }

        // Guardar el array actualizado
        localStorage.setItem("CART_ITEMS", JSON.stringify(existing));
        setCart(existing)
    };
  
    const deleteProduct = (producto) => {
      const existing = JSON.parse(localStorage.getItem("CART_ITEMS")) || [];

      const updated = existing.filter(p => p.producto !== producto.producto);

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
