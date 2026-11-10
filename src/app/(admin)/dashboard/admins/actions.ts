// src/app/(admin)/dashboard/admins/actions.ts

"use server";

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { z } from "zod";

async function requireSuperadmin() {
  const session = await auth();
  if ((session?.user as any)?.rol !== "superadmin") throw new Error("No autorizado");
  return session!;
}

const CreateAdminSchema = z.object({
  email: z.string().email().max(120),
  password: z.string().min(8).max(72),
  nombre: z.string().min(2).max(60),
});

export async function crearAdmin(_prev: unknown, formData: FormData) {
  await requireSuperadmin();
  const parsed = CreateAdminSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    nombre: formData.get("nombre"),
  });
  if (!parsed.success) return { error: "Datos inválidos" };

  await connectDB();
  const exists = await User.findOne({ email: parsed.data.email });
  if (exists) return { error: "Ese email ya existe" };

  const hash = await bcrypt.hash(parsed.data.password, 12);
  await User.create({ ...parsed.data, password: hash, rol: "admin" });
  revalidatePath("/dashboard/admins");
  return { ok: true };
}

export async function toggleActivo(userId: string) {
  await requireSuperadmin();
  await connectDB();
  const user = await User.findById(userId);
  if (!user) return;
  if (user.rol === "superadmin") return; // no desactivar a sí mismo ni a otro superadmin
  user.activo = !user.activo;
  await user.save();
  revalidatePath("/dashboard/admins");
}