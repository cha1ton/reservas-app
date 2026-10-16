// src/lib/validations.ts

import { z } from "zod";

const objectId = z.string().regex(/^[a-f\d]{24}$/i, "ID inválido");

export const ServicioSchema = z.object({
  nombre: z.string().min(2).max(80),
  descripcion: z.string().max(300).optional(),
  duracionMin: z.number().int().min(5).max(480),
  precio: z.number().min(0),
  activo: z.boolean().optional(),
});

export const ReservaSchema = z.object({
  servicio: objectId,
  clienteNombre: z.string().min(2).max(60),
  clienteTelefono: z.string().regex(/^[0-9+\-\s]{6,20}$/, "Teléfono inválido"),
  fecha: z.coerce.date().refine((d) => d > new Date(), "La fecha debe ser futura"),
  notas: z.string().max(300).optional(),
});

export const RegistroSchema = z.object({
  email: z.string().email().max(120),
  password: z.string().min(8).max(72), // 72 = límite bcrypt
  nombre: z.string().min(2).max(60),
});