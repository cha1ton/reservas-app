// src/app/(admin)/dashboard/admins/page.tsx

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import AdminsClient from "./AdminsClient";

export default async function AdminsPage() {
  const session = await auth();
  if ((session?.user as any)?.rol !== "superadmin") redirect("/dashboard");

  await connectDB();
  const admins = await User.find({ rol: "admin" })
    .select("-password")
    .sort({ createdAt: -1 })
    .lean();

  return (
    <AdminsClient
      admins={admins.map((a: any) => ({
        id: a._id.toString(),
        email: a.email,
        nombre: a.nombre,
        activo: a.activo,
      }))}
    />
  );
}