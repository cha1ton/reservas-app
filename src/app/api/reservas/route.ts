// src/app/api/reservas/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Reserva } from "@/models/Reserva";
import { ReservaSchema } from "@/lib/validations";
import { auth } from "@/lib/auth"; // luego lo creamos

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    await connectDB();
    const body = await req.json();
    const data = ReservaSchema.parse(body); // ← valida y bloquea inyección

    const reserva = await Reserva.create({ ...data, userId: session.user.id });
    return NextResponse.json(reserva, { status: 201 });
  } catch (err: any) {
    if (err?.name === "ZodError") {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}