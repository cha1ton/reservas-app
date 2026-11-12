// src/app/(admin)/dashboard/reservas/actions.ts

"use server";

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Reserva } from "@/models/Reserva";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const s = await auth();
  const rol = (s?.user as any)?.rol;
  if (rol !== "admin" && rol !== "superadmin") throw new Error("No autorizado");
}

export async function cambiarEstado(id: string, estado: "pendiente" | "confirmada" | "cancelada") {
  await requireAdmin();
  await connectDB();
  await Reserva.findByIdAndUpdate(id, { estado });
  revalidatePath("/dashboard/reservas");
}

export async function eliminarReserva(id: string) {
  await requireAdmin();
  await connectDB();
  await Reserva.findByIdAndDelete(id);
  revalidatePath("/dashboard/reservas");
}