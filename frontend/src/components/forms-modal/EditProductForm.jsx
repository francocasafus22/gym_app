import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { editProducto } from "../../api/GymAPI";
import { useForm } from "react-hook-form";
import InputForm from "../ui/InputForm";
import Options from "../ui/Options";
import { useState } from "react";
import Loading from "../Loading";

export default function EditProductoForm({ producto, onClose }) {
    const { register, handleSubmit, reset } = useForm({defaultValues: producto});
    const [categoria, setCategoria] = useState(false)

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: editProducto,
        onSuccess: async (data) => {
        toast.success(data.message);
        await queryClient.invalidateQueries(["productos"]);
        reset();
        onClose();
        },
        onError: (error) => {
        toast.error(error.message);
        },
    });

    const onSubmit = (data) => {
        mutate({ productoId: producto._id, formData: data });
    };

    return (
        <form
        className="p-10 flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
        >
        <h1 className="text-center text-3xl font-bold border-b border-accent pb-2 mb-2">
            Editar Producto
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
            options={[
            "Bebidas",
            "Snacks",
            "Suplementos",
            "Accesorios",
            "Indumentaria",
            ]}
            length={3}
        ></Options>

        <button
            type="submit"
            className="bg-accent shadow-2xl hover:brightness-90 transition-all duration-200 w-full p-3 mt-5 rounded-lg text-white font-black  text-xl cursor-pointer"
        >
            {isPending ? <Loading color="primary"/> : "Guardar cambios"}
        </button>
        </form>
    );
}
