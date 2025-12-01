import {useState } from "react";
import { Search } from "lucide-react";
import Pagination from "./Pagination"

export default function TablaProductos({ data }) {         

    function handleDelete(id) {
        // ejemplo: eliminar localmente. En real app, llamar API + invalidar cache
        setProducts((prev) => prev.filter((p) => p.id !== id));
    }
    
    

    return (
        <div className="w-full px-5 max-w-7xl mx-auto">
            
        <div className="overflow-x-auto rounded-lg shadow border border-border">
            <table className="min-w-full divide-y divide-border">
            <thead className="bg-transparent">
                <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Producto
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Categoría
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">
                    Precio
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">
                    Precio costo
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">
                    Stock
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">
                    Acciones
                </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-border">
                {data.productos.length === 0 ? (
                <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                    No hay productos
                    </td>
                </tr>
                ) : (
                data.productos.map((p) => (
                    <tr key={p.id} className="hover:bg-accent hover:text-accent-foreground transition-all duration-200">
                    <td className="px-4 py-3 flex items-center gap-3">                        
                        <div>
                        <div className="font-medium">{p.nombre}</div>                        
                        </div>
                    </td>
                    <td className="px-4 py-3 text-sm ">
                        {p.categoria}
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-medium">
                        ${p.precio.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-medium">
                        ${p.precioCosto.toFixed(2)}
                    </td>
                    <td
                        className={`px-4 py-3 text-sm text-right ${
                        p.stock === 0 && "text-red-500"}`}
                    >
                        {p.stock}
                    </td>
                    <td className="px-4 py-3 text-sm text-center">
                        <div className="inline-flex gap-2">
                            
                            <button
                                type="button"
                                className="px-3 py-1 rounded-md bg-gray-100 hover:brightness-90 transition-all duration-200 text-sm text-secondary cursor-pointer"
                                onClick={() => alert("Editar " + p.id)}
                            >
                                Editar
                            </button>
                            <button
                                type="button"
                                className="px-3 py-1 rounded-md bg-red-500 text-white hover:brightness-90 text-sm cursor-pointer"
                                onClick={() => handleDelete(p.id)}
                            >
                                Borrar
                            </button>
                            <button
                            type="button"
                            className="px-3 py-1 rounded-md bg-secondary text-white hover:brightness-90 transition-all duration-200 text-sm cursor-pointer"
                            onClick={() => handleDelete(p.id)}
                            >
                                Agregar
                            </button>
                        </div>
                    </td>
                    </tr>
                ))
                )}
            </tbody>
            </table>            
        </div>
        
        </div>
    );
}
