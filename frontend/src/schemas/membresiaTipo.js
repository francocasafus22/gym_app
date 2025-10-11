import {z} from "zod";

export const MembresiaTipoEditSchema = z.object({
    descripcion: z.string().nonempty("La descripcion es obligatoria").max(50, "La descripcion debe tener menos de 50 caracteres"),
})