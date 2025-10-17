import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editMembresiaTipo } from '../../api/GymAPI';
import { useState } from 'react'
import { toast } from 'sonner';
import { capitalize } from '../../utils/formatText';
import { MembresiaTipoEditSchema } from '../../schemas/membresiaTipo';
import ErrorMessage from '../ErrorMessage';

export default function MembresiaTipoForm({data, onClose}) {

    const [precioInput, setPrecioInput] = useState(data.precio);
    const [descripcionInput, setDescripcionInput] = useState(data.descripcion);
    const [errors, setErrors] = useState({});

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
      const formData = {
        nombre: data.nombre,
        descripcion: descripcionInput,
        precio: precioInput
      }

      const result = MembresiaTipoEditSchema.safeParse(formData);
      
      const fieldErrors = {};

      if(!result.success){
        result.error.issues.forEach((issue)=>{
          fieldErrors[issue.path[0]] = issue.message
        })
        setErrors(fieldErrors)
        return;
      }

     
      mutate(formData);
    }

    const handleInputDescripcion = (e) => {
      if(e.target.value <= 100){
        setDescripcionInput(e.target.value)
      } else{
        setDescripcionInput(e.target.value.slice(0,100))}
    } 
  
  return (
    <form className="p-10 flex flex-col gap-2" onSubmit={(e) => handleSubmit(e)}>
        <h1 className='text-center text-3xl font-bold border-b border-accent pb-2 mb-2'>Membresia {capitalize(data.nombre)}</h1>
        
              <div className="flex flex-col gap-2">
                <label className="font-bold text-xl ">Descripcion</label>

                <textarea
                  id="descripcion"
                  value={descripcionInput}
                  placeholder="Descripción de la membresia"
                  className="w-full border shadow-md border-gray-300 p-3 rounded-lg focus:outline-none transition-all duration-200 focus:border-accent "
                  name="descripcion"
                  onChange={(e)=>handleInputDescripcion(e)}
                />
                <p>{descripcionInput.length}/100</p>
                {errors.descripcion && <ErrorMessage>{errors.descripcion}</ErrorMessage>}
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
                  required               
                />
               {errors.precio && <ErrorMessage>{errors.precio}</ErrorMessage>}
              </div>

              <input
                type="submit"
                value="Guardar Cambios"
                className="bg-accent shadow-2xl hover:brightness-90 transition-all duration-200 w-full p-3 mt-5 rounded-lg text-white font-black  text-xl cursor-pointer"
              />
             {
              isError && <ErrorMessage>{error}</ErrorMessage>
             }
            </form>
  )
}
