import {z} from "zod";

export const MembresiaTipoEditSchema = z.object({
    descripcion: z.string().nonempty("La descripcion es obligatoria").max(100, "La descripcion debe tener menos de 100 caracteres"),
    precio: z
    .coerce
    .number({
      invalid_type_error: "El precio debe ser un número",
      required_error: "El precio es obligatorio",
    })
    .int("El precio debe ser un número entero")
    .min(1, "El precio debe ser mayor a 0"),
})