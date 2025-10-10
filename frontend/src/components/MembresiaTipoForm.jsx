import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editMembresiaTipo } from '../api/GymAPI';
import { useState } from 'react'
import { toast } from 'sonner';
import { capitalize } from '../utils/formatText';

export default function MembresiaTipoForm({data, onClose}) {

    const [precioInput, setPrecioInput] = useState(data.precio);
    const [descripcionInput, setDescripcionInput] = useState(data.descripcion);

    const queryClient = useQueryClient()

    const {mutate, isPending, isSuccess, isError, error} = useMutation({
      mutationFn: editMembresiaTipo,
      onSuccess: (data) => {
        queryClient.invalidateQueries(["membresiasTipo"]);
 
        
        toast.success(data.message)
        onClose()
      },
      onError: (data) => {
        toast.error(data.error)
      },
    })

    const handleSubmit = (e) => {
      e.preventDefault();
      
      mutate({nombre: data.nombre, precio: precioInput, descripcion: descripcionInput});
    }

  return (
    <form className="p-10 flex flex-col gap-2" onSubmit={(e) => handleSubmit(e)}>
        <h1 className='text-center text-3xl font-bold border-b border-accent pb-2 mb-2'>Membresia {capitalize(data.nombre)}</h1>
        
              <div className="flex flex-col gap-2">
                <label className="font-bold text-xl ">Descripcion</label>

                <input
                  id="descripcion"
                  type="text"
                  placeholder="Descripción de la membresia"
                  className="w-full border shadow-md border-gray-300 p-3 rounded-lg focus:outline-none  transition-all duration-200 focus:border-accent "
                  name="descripcion"
                  onChange={(e)=>setDescripcionInput(e.target.value)}
                  value={descripcionInput}
                />
                
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-xl">Precio</label>

                <input
                  type="number"
                  id='precio'
                  placeholder="Precio de la membresia"
                  className="w-full border shadow-md border-gray-300 p-3 rounded-lg focus:outline-none transition-all duration-200 focus:border-accent "
                  name="precio"
                  onChange={(e)=>setPrecioInput(e.target.value)}
                  value={precioInput}                
                />
               
              </div>

              <input
                type="submit"
                value="Editar"
                className="bg-accent shadow-2xl hover:brightness-90 transition-all duration-200 w-full p-3 mt-5 rounded-lg text-white font-black  text-xl cursor-pointer"
              />
             
            </form>
  )
}
