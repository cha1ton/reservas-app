// src/lib/validations.ts
import { z } from "zod";
export const ReservaSchema = z.object({
  servicioId: z.string().regex(/^[a-f\d]{24}$/i, "ID inválido"),
  fecha: z.coerce.date().min(new Date(), "Fecha pasada"),
  nombre: z.string().min(2).max(60),
  telefono: z.string().regex(/^[0-9+\-\s]{6,15}$/),
});