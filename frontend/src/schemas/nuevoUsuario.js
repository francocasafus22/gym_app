import zod from "zod";

export const NuevoUsuarioSchema = zod.object({
  firstName: zod
    .string()
    .min(1, { message: "El nombre es obligatorio" })
    .max(100),
  lastName: zod
    .string()
    .min(1, { message: "El apellido es obligatorio" })
    .max(100),
  dni: zod.string().min(8, { message: "DNI debe tener 8 carácteres" }).max(8),
  email: zod
    .string()
    .min(1, { message: "El email es obligatorio" })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "El email no es válido" })
});
