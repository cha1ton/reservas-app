// src/app/(public)/reservar/actions.ts

"use server";

import { connectDB } from "@/lib/mongodb";
import { Reserva } from "@/models/Reserva";
import { Servicio } from "@/models/Servicio";
import { ReservaSchema } from "@/lib/validations";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";

export async function crearReserva(_prev: unknown, formData: FormData) {
  const raw = {
    servicio: formData.get("servicio"),
    clienteNombre: formData.get("clienteNombre"),
    clienteTelefono: formData.get("clienteTelefono"),
    fecha: formData.get("fecha"),
    notas: formData.get("notas") || undefined,
  };

  const parsed = ReservaSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  await connectDB();

  // Validar que el servicio exista y esté activo
  const servicio = await Servicio.findById(parsed.data.servicio);
  if (!servicio || !servicio.activo) return { error: "Servicio no disponible" };

  // Evitar doble reserva en el mismo slot (±duración)
  const slotStart = new Date(parsed.data.fecha);
  const slotEnd = new Date(slotStart.getTime() + servicio.duracionMin * 60000);
  const choque = await Reserva.findOne({
    fecha: { $gte: new Date(slotStart.getTime() - servicio.duracionMin * 60000), $lt: slotEnd },
    estado: { $ne: "cancelada" },
  });
  if (choque) return { error: "Ese horario ya está reservado. Elige otro." };

  await Reserva.create({
    servicio: new Types.ObjectId(parsed.data.servicio),
    clienteNombre: parsed.data.clienteNombre,
    clienteTelefono: parsed.data.clienteTelefono,
    fecha: parsed.data.fecha,
    notas: parsed.data.notas,
  });

  revalidatePath("/dashboard/reservas");
  return { ok: true };
}