import InputForm from "../ui/InputForm";
import { useState } from "react";
import Options from "../ui/Options";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRutina, createVenta } from "../../api/GymAPI";
import { toast } from "sonner";
import { PostRutinaSchema } from "../../schemas/editRutina";
import { useForm } from "react-hook-form";
import useCart from "../../hooks/useCart";
import {currency} from "../../utils/formatText"

export default function CrearVentaForm({ onClose }){

    const queryClient = useQueryClient()
    const {cart, clearCart} = useCart()
    const [metodo, setMetodo] = useState("Efectivo");  
    const [efectivo, setEfectivo] = useState("")
    const [cartTotal, setCartTotal] = useState(cart.reduce((acc, p) => acc + p.total, 0))

    const { mutate } = useMutation({
        mutationFn: createVenta,
        onSuccess: async (data) => {      
        toast.success(data.message);
        await queryClient.invalidateQueries(["productos"])
        clearCart();
        onClose();
        },
        onError: (data) => {
        toast.error(data.error);
        },
    });


    const onSubmit = (e) => {    
        e.preventDefault()
        const productos = cart.map(p=>({
            productoId: p.producto, cantidad: p.cantidad
        }))
        
        mutate({productos, metodo});
    };

    return (
        <form
        className="p-10 flex flex-col gap-3 text-lg"
        onSubmit={(e)=>onSubmit(e)}
        >
        <h1 className="text-center text-3xl font-bold border-b-2 border-accent pb-2 mb-2">
            Completar Venta
        </h1>

        <Options
            label={"Método de Pago"}
            setOption={setMetodo}
            value={metodo}
            options={["Efectivo", "Transferencia"]}
            length={2}
        ></Options>        

        {metodo === "Transferencia" 
            ? 
            (<div><p>Transferir al alias <span className="text-accent font-medium">spartangym.mp</span> a nombre de <span className="text-accent font-medium">Angel Gabriel Vera</span></p> <p className="text-placeholder text-md font-light">Asegurarse que llegue el dinero a la cuenta y terminar la venta</p></div>) 
            : 
            (<div className="space-y-2">

                <p className="">
                    Total a recibir:{" "}
                    <span className="text-accent font-bold">
                        {currency(cartTotal)}
                    </span>
                </p>

                <InputForm label={"Efectivo recibido"} name={"efectivo"} type="number" id={"efectivo"} placeholder={100} value={efectivo} onChange={(e)=>setEfectivo(e.target.value)}/>
                {efectivo && <p>{(efectivo-cartTotal) < 0 ? "Falta" : "Vuelto"}: <span className="text-accent font-bold">{currency(efectivo - cartTotal)}</span></p>}
            </div>)
        }

        <button
            type="submit"
            className="bg-accent shadow-2xl hover:brightness-90 transition-all duration-200 w-full p-3 mt-5 rounded-lg text-white font-black  text-xl cursor-pointer"
        >
            Terminar Venta
        </button>
        </form>
    );
}