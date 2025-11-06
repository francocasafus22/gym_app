import { z } from "zod";

export const PostRutinaSchema = z.object({
  nombre: z.string().nonempty("El nombre es obligatorio"),
  descripcion: z
    .string()
    .nonempty("La descripción es obligatoria")
    .max(255, "La descripción no puede tener más de 255 carácteres"),
  tipo: z
    .string()
    .nonempty("El tipo es obligatorio")
    .refine((val) => ["Plantilla", "Personalizada"].includes(val), {
      message: "El tipo debe ser Plantilla o Personzalida",
    }),
  nivel: z
    .string()
    .nonempty("El nivel es obligatorio")
    .refine((val) => ["Principiante", "Intermedio", "Avanzado"].includes(val), {
      message: "El nivel debe ser Principiante, Intermedio o Avanzado",
    }),
  diasPorSemana: z
    .number()
    .min(1, "La cantidad de dias debe al menos 1")
    .max(7, "La cantidad de dias no puede superar los 7"),
});
