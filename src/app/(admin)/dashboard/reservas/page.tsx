// src/app/(admin)/dashboard/reservas/page.tsx

import { connectDB } from "@/lib/mongodb";
import { Reserva } from "@/models/Reserva";
import ReservasClient from "./ReservasClient";

export default async function ReservasPage() {
  await connectDB();
  const reservas = await Reserva.find({}).sort({ fecha: 1 }).populate("servicio").lean();

  return (
    <ReservasClient
      reservas={reservas.map((r: any) => ({
        id: r._id.toString(),
        clienteNombre: r.clienteNombre,
        clienteTelefono: r.clienteTelefono,
        fecha: r.fecha.toISOString(),
        estado: r.estado,
        notas: r.notas ?? "",
        servicio: r.servicio?.nombre ?? "—",
      }))}
    />
  );
}