// src/app/(public)/reservar/page.tsx

import { connectDB } from "@/lib/mongodb";
import { Servicio } from "@/models/Servicio";
import ReservarForm from "./ReservarForm";

export default async function ReservarPage() {
  await connectDB();
  const servicios = await Servicio.find({ activo: true }).select("_id nombre precio duracionMin").lean();

  return (
    <main className="min-h-screen px-6 py-32">
      <div className="mx-auto max-w-xl">
        <h1 className="text-4xl font-bold text-center">Reserva tu cita</h1>
        <p className="text-center text-white/60 mt-2">Sin llamadas. Sin esperas.</p>

        <div className="glass mt-10 p-8">
          <ReservarForm
            servicios={servicios.map((s: any) => ({
              id: s._id.toString(),
              nombre: s.nombre,
              precio: s.precio,
              duracionMin: s.duracionMin,
            }))}
          />
        </div>
      </div>
    </main>
  );
}