import {useState } from "react";


export default function ProductoFilaTabla({ p, onOpenDelete, onOpenEdit, onOpenAdd }) {
    

    return (    
        <tr className="hover:bg-accent hover:text-accent-foreground transition-all duration-200">
            <td className="px-4 py-3 flex items-center gap-3">
            <div>
                <div className="font-medium">{p.nombre}</div>
            </div>
            </td>
            <td className="px-4 py-3 text-sm ">{p.categoria}</td>
            <td className="px-4 py-3 text-sm text-right font-medium">
            ${p.precio.toFixed(2)}
            </td>
            <td className="px-4 py-3 text-sm text-right font-medium">
            ${p.precioCosto.toFixed(2)}
            </td>
            <td
            className={`px-4 py-3 text-sm text-right ${
                p.stock === 0 && "text-red-500"
            }`}
            >
            {p.stock}
            </td>
            <td className="px-4 py-3 text-sm text-center">
            <div className="inline-flex gap-2">
                <button
                type="button"
                className="px-3 py-1 rounded-md bg-gray-100 hover:brightness-90 transition-all duration-200 text-sm text-secondary cursor-pointer"
                onClick={()=>onOpenEdit(p)}
                >
                Editar
                </button>
                <button
                type="button"
                className="px-3 py-1 rounded-md bg-red-500 text-white hover:brightness-90 text-sm cursor-pointer"
                onClick={()=>onOpenDelete(p)}
                >
                Borrar
                </button>
                <button
                type="button"
                className="px-3 py-1 rounded-md bg-secondary text-white hover:brightness-90 transition-all duration-200 text-sm cursor-pointer"
                onClick={() => onOpenAdd(p)}
                >
                Agregar
                </button>
            </div>
            </td>
        </tr>    
    );
}
