import ProductoFilaTabla from "./ProductoFilaTabla";
import Modal from "./Modal";
import DeleteProductoForm from "./forms-modal/DeleteProductoForm";
import { useEffect, useState } from "react";
import EditProductoForm from "./forms-modal/EditProductForm";
import useCart from "../hooks/useCart";

export default function TablaProductos({ data }) {             
    

    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [productoSeleccionado, setProductoSeleccionado]  = useState(null)    
    const {addProduct} = useCart()

    return (            
            
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
                    <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                    No hay productos
                    </td>
                </tr>
                ) : (
                data.productos.map((p) => (
                    <ProductoFilaTabla p={p} key={p._id} 
                    onOpenDelete={(p)=>{setProductoSeleccionado(p); setIsOpenDelete(!isOpenDelete)}} 
                    onOpenEdit={p=>{setProductoSeleccionado(p); setIsOpenEdit(!isOpenEdit)}}
                    onOpenAdd={p=>addProduct(p)}
                    />
                ))
                )}
            </tbody>
            </table>            
        
            {isOpenDelete && (
                <Modal isOpen={isOpenDelete} onClose={() => setIsOpenDelete(false)}>
                    
                    <DeleteProductoForm productoId={productoSeleccionado._id} onClose={()=>setIsOpenDelete(false)}/>

                </Modal>
            )}

            {
                isOpenEdit && (
                    <Modal isOpen={isOpenEdit} onClose={()=>setIsOpenEdit(false)}>
                        <EditProductoForm producto={productoSeleccionado} onClose={()=>setIsOpenEdit(false)}/>
                    </Modal>
                )
            }

        </div>    
        
    );
}


