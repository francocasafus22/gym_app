import z from "zod";

export const AgregarProductoSchema = z.object({
    nombre: z
        .string()
        .min(1, { message: "El nombre es obligatorio" })
        .max(255),
    precio: z.coerce
        .number({
        invalid_type_error: {message: "El precio debe ser un número"},
        required_error: {message: "El precio es obligatorio"},
        })
        .int({message: "El precio debe ser un número entero"})
        .min(1, {message: "El precio debe ser mayor a 0"}),
    precioCosto: z.coerce
        .number({
        invalid_type_error: {message: "El precio de costo debe ser un número"},
        required_error: {message: "El precio de costo es obligatorio"},
        })
        .int({message: "El precio de costo debe ser un número entero"})
        .min(1, {message: "El precio de costo debe ser mayor a 0"}),
    stock: z.coerce
        .number({
        invalid_type_error: {message: "El stock debe ser un número"},
        required_error: {message: "El stock es obligatorio"},
        })
        .int({message: "El stock debe ser un número entero"})
        .min(0, {message: "El stock debe ser mayor o igual a 0"}),
    categoria: z.enum(["Bebidas", "Snacks", "Suplementos", "Accesorios", "Indumentaria"], {message: "Categoria no válida"})
});
