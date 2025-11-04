import { z } from "zod";

export const assignExerciseSchema = z.object({
  ejercicioId: z
    .string({ message: "No has seleccionado un ejercicio válido" })
    .min(1, { message: "No has seleccionado un ejercicio válido" })
    .regex(/^[0-9a-fA-F]{24}$/, {
      message: "No has seleccionado un ejercicio válido",
    }),
  rutinaId: z
    .string({ message: "No has seleccionado una rutina válida" })
    .min(1, { message: "No has seleccionado una rutina válida" })
    .regex(/^[0-9a-fA-F]{24}$/, {
      message: "No has seleccionado una rutina válida",
    }),
  formData: z.object({
    series: z
      .number()
      .min(1, { message: "La cantidad de series debe ser mayor o igual a 1" })
      .max(10, {
        message: "La cantidad de series debe ser menor o igual a 10",
      }),
    repeticiones: z
      .number()
      .min(1, {
        message: "La cantidad de repeticiones debe ser mayor o igual a 1",
      })
      .max(50, {
        message: "La cantidad de repeticiones debe ser menor o igual a 50",
      }),
    descanso: z
      .number()
      .min(1, { message: "El tiempo de descanso debe ser mayor o igual a 1" })
      .max(15, {
        message: "El tiempo de descanso debe ser menor o igual a 15",
      }),
    dia: z
      .number()
      .min(1, { message: "El día debe ser mayor o igual a 1" })
      .max(7, { message: "El día debe ser menor o igual a 7" }),
  }),
});
