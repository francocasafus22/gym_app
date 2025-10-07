import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("El email no puede ir vacio")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "El email no es válido"),
  password: z
    .string()
    .nonempty("El password no puede ir vacio")
    .min(6, "El password debe tener al menos 6 caracteres"),
});
