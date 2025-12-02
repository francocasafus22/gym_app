import InputForm from "../ui/InputForm";
import { useState } from "react";
import Options from "../ui/Options";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { agregarProducto, createRutina } from "../../api/GymAPI";
import { toast } from "sonner";
import { PostRutinaSchema } from "../../schemas/editRutina";
import {useForm} from "react-hook-form"
import { AgregarProductoSchema } from "../../schemas/agregarProductoSchema";

export default function AgregarProductoForm({ onClose }) {
    
    const {register, handleSubmit} = useForm()    
    const [categoria, setCategoria] = useState(null);
    const [metodo, setMetodo] = useState(null)

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: agregarProducto,
        onSuccess: (data) => {
        queryClient.invalidateQueries(["productos"]);
        toast.success(data.message);
        onClose();
        },
        onError: (data) => {
        toast.error(data.error);
        },
    });

    const onSubmit = (data) => {        
        const result = AgregarProductoSchema.safeParse({...data, categoria});
        if(!result.success){
            result.error.issues.map(issue=>toast.error(issue.message));
            return
        }
        mutate(result.data)
    };

    return (
        <form
        className="p-10 flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
        >
        <h1 className="text-center text-3xl font-bold border-b border-accent pb-2 mb-2">
            Crear Producto
        </h1>

        <InputForm
            label={"Nombre"}
            id={"nombre"}
            name={"nombre"}
            placeholder={"Nombre del producto"} 
            register={register}           
            required={true}
            type="text"
        ></InputForm>

        <InputForm
            label={"Precio"}
            id={"precio"}
            name={"precio"}
            placeholder={"100"}
            register={register}
            required={true}
            type="number"
        ></InputForm>

        <InputForm
            label={"Precio costo"}
            id={"precioCosto"}
            name={"precioCosto"}
            register={register}
            placeholder={"50"}            
            required={true}
            type="number"
        ></InputForm>

        <InputForm
            label={"Stock"}
            id={"stock"}      
            name={"stock"}      
            placeholder={"10"}
            register={register}
            required={true}
            type="number"
        ></InputForm>

        <Options
            label={"Categoria"}
            setOption={setCategoria}
            value={categoria}
            options={["Bebidas", "Snacks", "Suplementos", "Accesorios", "Indumentaria"]}
            length={3}
        ></Options>

        <button
            type="submit"
            className="bg-accent shadow-2xl hover:brightness-90 transition-all duration-200 w-full p-3 mt-5 rounded-lg text-white font-black  text-xl cursor-pointer"
        >
            Crear Producto
        </button>
        </form>
    );
}
