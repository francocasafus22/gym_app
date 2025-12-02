import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProducto } from "../../api/GymAPI";
import { toast } from "sonner";

export default function DeleteProductoForm ({productoId, onClose}){

    const queryClient = useQueryClient()


    const {mutate, isPending} = useMutation({
        mutationFn: deleteProducto,
        onSuccess: async (data)=>{
            toast.success(data.message)
            await queryClient.invalidateQueries(["productos"])
            onClose()
        },
        onError: (error)=>{toast.error(error.message)}
    })

    const onSubmit = (e) => {
        e.preventDefault();        
        mutate(productoId)
    }

    return(
        <form className="p-10 space-y-5">
                    <div>
                        <p className="text-2xl text-start font-bold ">¿Estás seguro de borrar el producto?</p>
                        <p className="text-start">No se podrá recuperar</p>
                    </div>

                        <div className="flex items-center justify-end gap-2">
                            <button className="border-accent border py-1 px-3 rounded-md cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300" onClick={onClose}>Volver</button>
                            <button className="bg-accent text-accent-foreground py-1 px-3 rounded-md cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300" onClick={(e)=>onSubmit(e)}>Borrar</button>
                        </div>
        </form>
    )
}