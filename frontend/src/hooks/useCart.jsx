import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        console.log("Context no definido");
        throw new Error("useCart debe ser usado dentro de su provider");
    }

    return context;
}
