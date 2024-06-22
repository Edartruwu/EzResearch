import { z } from "zod";

export const mainForm = z.object({
  titulo: z.string().min(5, {
    message: "El titulo es demasiado corto",
  }),
  texto_bruto: z.string().min(10, {
    message: "El texto es demasiado corto",
  }),
  mapa_numerico: z.string().min(10, {
    message: "El mapa numerico ingresado es demasiado corto",
  }),
});

export type MainFormData = z.infer<typeof mainForm>;
