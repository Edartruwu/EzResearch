import { z } from "zod";

export const RevistaSchema = z.object({
  titulo: z.string().trim().min(1, { message: "Título es requerido" }),
  autores: z
    .string()
    .trim()
    .min(1, { message: "Autores es requerido" })
    .refine(
      (val) => val.split(",").every((author) => author.trim().length > 0),
      {
        message:
          "Cada nombre de autor debe estar separado por comas y no vacío",
      },
    ),
  fecha: z.date(),
  editorial: z
    .string()
    .trim()
    .min(1, { message: "El nombre de la editorial es requerido" }),
  volumen: z.string().optional(),
  emision: z.string().optional(),
  paginas: z.string().optional(),
  doi: z.string().trim().url().optional(),
  url: z.string().trim().url().optional(),
  idioma: z.enum(["español", "ingles"]).optional(),
});

export type RevistaData = z.infer<typeof RevistaSchema>;

export const LibroSchema = z.object({
  titulo: z.string().trim().min(1, { message: "Título is required" }),
  autores: z
    .string()
    .trim()
    .min(1, { message: "Autores is required" })
    .refine(
      (val) => val.split(",").every((author) => author.trim().length > 0),
      { message: "Each author name must be separated by commas and non-empty" },
    ),
  fecha: z.date(),
  editorial: z
    .string()
    .trim()
    .min(1, { message: "El nombre de la editorial es requerido" }),
  direccion: z.string().trim().min(1, { message: "La dirección es requerida" }),
  url: z
    .string()
    .trim()
    .url()
    .min(1, { message: "La url ingresada no es valida" })
    .optional(), // Validate URL format if optional
  idioma: z.enum(["español", "ingles"]).optional(), // Use array for enum values
});

export type BookData = z.infer<typeof LibroSchema>;

export const TesisSchema = z.object({
  titulo: z.string().trim().min(1, { message: "Título is required" }),
  autores: z
    .string()
    .trim()
    .min(1, { message: "Autores is required" })
    .refine(
      (val) => val.split(",").every((author) => author.trim().length > 0),
      { message: "Each author name must be separated by commas and non-empty" },
    ),
  fecha: z.date(),
  universidad: z
    .string()
    .trim()
    .min(1, { message: "El nombre de la universidad es requerido" }),
  lugar_universidad: z
    .string()
    .trim()
    .min(1, { message: "El lugar de la universidad es requerido" }),
  doi: z.string().trim().url().optional(), // Validate URL format if optional
  url: z.string().trim().url().optional(), // Validate URL format if optional
  idioma: z.enum(["español", "ingles"]).optional(), // Use array for enum values
});

export type TesisData = z.infer<typeof TesisSchema>;
