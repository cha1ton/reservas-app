// src/app/(admin)/dashboard/page.tsx

import { connectDB } from "@/lib/mongodb";
import { Reserva } from "@/models/Reserva";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();
  await connectDB();

  const [total, pendientes, hoy, ultimas] = await Promise.all([
    Reserva.countDocuments({}),
    Reserva.countDocuments({ estado: "pendiente" }),
    Reserva.countDocuments({
      fecha: { $gte: new Date(new Date().setHours(0,0,0,0)),
               $lt:  new Date(new Date().setHours(23,59,59,999)) },
    }),
    Reserva.find({}).sort({ fecha: 1 }).limit(5).populate("servicio").lean(),
  ]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Bienvenido, {session?.user?.name}</h1>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total reservas", value: total },
          { label: "Pendientes", value: pendientes },
          { label: "Hoy", value: hoy },
        ].map((k) => (
          <div key={k.label} className="glass p-6">
            <p className="text-sm text-white/60">{k.label}</p>
            <p className="text-4xl font-bold mt-2">{k.value}</p>
          </div>
        ))}
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4">Próximas 5 reservas</h2>
        <div className="glass divide-y divide-white/10">
          {ultimas.length === 0 && (
            <p className="p-6 text-white/60 text-sm">Sin reservas aún.</p>
          )}
          {ultimas.map((r: any) => (
            <div key={r._id.toString()} className="p-4 flex justify-between items-center text-sm">
              <div>
                <p className="font-medium">{r.clienteNombre}</p>
                <p className="text-white/50">{r.clienteTelefono} · {r.servicio?.nombre ?? "—"}</p>
              </div>
              <div className="text-right">
                <p>{new Date(r.fecha).toLocaleString("es-PE")}</p>
                <p className="text-white/50 capitalize">{r.estado}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}