import {useState } from "react";

export default function TablaProductos({ initialProducts }) {
    
    function handleDelete(id) {
        // ejemplo: eliminar localmente. En real app, llamar API + invalidar cache
        setProducts((prev) => prev.filter((p) => p.id !== id));
    }

    return (
        <div className="w-full max-w-6xl mx-auto p-4 bio">
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
                    Stock
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">
                    Acciones
                </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-border">
                {sampleProducts.length === 0 ? (
                <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                    No hay productos
                    </td>
                </tr>
                ) : (
                sampleProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 flex items-center gap-3">
                        <img
                        src={p.image}
                        alt={p.name}
                        className="w-12 h-12 rounded-md object-cover"
                        />
                        <div>
                        <div className="font-medium text-gray-900">{p.name}</div>
                        <div className="text-xs text-gray-500">SKU: {p.sku}</div>
                        </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                        {p.category}
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-medium">
                        ${p.price.toFixed(2)}
                    </td>
                    <td
                        className={`px-4 py-3 text-sm text-right ${
                        p.stock === 0 ? "text-red-500" : "text-gray-700"
                        }`}
                    >
                        {p.stock}
                    </td>
                    <td className="px-4 py-3 text-sm text-center">
                        <div className="inline-flex gap-2">
                            
                            <button
                                type="button"
                                className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-sm"
                                onClick={() => alert("Editar " + p.id)}
                            >
                                Editar
                            </button>
                            <button
                                type="button"
                                className="px-3 py-1 rounded-md bg-red-500 text-white hover:brightness-95 text-sm"
                                onClick={() => handleDelete(p.id)}
                            >
                                Borrar
                            </button>
                            <button
                            type="button"
                            className="px-3 py-1 rounded-md bg-secondary text-white hover:brightness-95 text-sm"
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

// Datos de ejemplo
const sampleProducts = [
  {
    id: 1,
    name: "Camiseta Rockera",
    sku: "TS-001",
    category: "Ropa",
    price: 2499.0,
    stock: 12,
    image: "https://picsum.photos/seed/p1/200/200",
  },
  {
    id: 2,
    name: "Auriculares Gamer",
    sku: "HG-210",
    category: "Electrónica",
    price: 8999.5,
    stock: 4,
    image: "https://picsum.photos/seed/p2/200/200",
  },
  {
    id: 3,
    name: "Mochila Urbana",
    sku: "MB-10",
    category: "Accesorios",
    price: 15999.99,
    stock: 0,
    image: "https://picsum.photos/seed/p3/200/200",
  },
  {
    id: 4,
    name: "Smartwatch X",
    sku: "SW-55",
    category: "Electrónica",
    price: 29999.0,
    stock: 6,
    image: "https://picsum.photos/seed/p4/200/200",
  },
  {
    id: 5,
    name: "Guitarra Acústica",
    sku: "GT-88",
    category: "Instrumentos",
    price: 45999.0,
    stock: 2,
    image: "https://picsum.photos/seed/p5/200/200",
  },
  {
    id: 6,
    name: "Zapatillas Running",
    sku: "ZR-77",
    category: "Calzado",
    price: 12999.0,
    stock: 8,
    image: "https://picsum.photos/seed/p6/200/200",
  },
  {
    id: 7,
    name: "Cargador Rápido",
    sku: "CH-9",
    category: "Accesorios",
    price: 1999.0,
    stock: 30,
    image: "https://picsum.photos/seed/p7/200/200",
  },
  {
    id: 8,
    name: "Teclado Mecánico",
    sku: "TK-01",
    category: "Electrónica",
    price: 21999.0,
    stock: 5,
    image: "https://picsum.photos/seed/p8/200/200",
  },
  {
    id: 9,
    name: 'Monitor 24"',
    sku: "MN-24",
    category: "Electrónica",
    price: 34999.0,
    stock: 3,
    image: "https://picsum.photos/seed/p9/200/200",
  },
  {
    id: 10,
    name: "Libro: JavaScript Moderno",
    sku: "BK-JS",
    category: "Libros",
    price: 4999.0,
    stock: 15,
    image: "https://picsum.photos/seed/p10/200/200",
  },
];
