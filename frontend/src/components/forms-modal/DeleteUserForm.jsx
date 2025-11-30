import {  useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteUser } from "../../api/GymAPI"
import { toast } from "sonner"

export default function DeleteUserForm({onClose, userId}){

    const queryClient = useQueryClient()

    const {mutate, isPending} = useMutation({
        mutationFn: deleteUser,
        onSuccess: (data)=>{toast.success(data.message); onClose(); queryClient.invalidateQueries(["users"])},
        onError: (error)=>{toast.error(error.message)} 
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        mutate({userId})
    }

    return (
        <form className="p-10 space-y-5" onSubmit={(e)=>handleSubmit(e)}>
           <div>
             <p className="text-2xl text-start font-bold ">¿Estás seguro de borrar el usuario?</p>
            <p className="text-start">No se podrá recuperar</p>
           </div>

            <div className="flex items-center justify-end gap-2">
                <button className="border-accent border py-1 px-3 rounded-md cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300" onClick={onClose}>Volver</button>
                <button className="bg-accent text-accent-foreground py-1 px-3 rounded-md cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300" type="submit">Borrar</button>
            </div>
        </form>
    )
}