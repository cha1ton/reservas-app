// src/app/(admin)/dashboard/reservas/ReservasClient.tsx

"use client";

import { cambiarEstado, eliminarReserva } from "./actions";

type R = {
  id: string; clienteNombre: string; clienteTelefono: string;
  fecha: string; estado: "pendiente" | "confirmada" | "cancelada";
  notas: string; servicio: string;
};

const colorEstado = {
  pendiente: "bg-yellow-500/20 text-yellow-200",
  confirmada: "bg-emerald-500/20 text-emerald-300",
  cancelada: "bg-red-500/20 text-red-300",
};

export default function ReservasClient({ reservas }: { reservas: R[] }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reservas</h1>

      <div className="glass divide-y divide-white/10">
        {reservas.length === 0 && <p className="p-6 text-white/60 text-sm">Sin reservas.</p>}
        {reservas.map((r) => (
          <div key={r.id} className="p-4 grid gap-3 sm:grid-cols-[1fr_auto] items-center">
            <div>
              <div className="flex items-center gap-3">
                <p className="font-medium">{r.clienteNombre}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${colorEstado[r.estado]}`}>{r.estado}</span>
              </div>
              <p className="text-sm text-white/50 mt-1">{r.clienteTelefono} · {r.servicio}</p>
              <p className="text-sm text-white/70 mt-1">{new Date(r.fecha).toLocaleString("es-PE")}</p>
              {r.notas && <p className="text-xs text-white/40 mt-1 italic">“{r.notas}”</p>}
            </div>

            <div className="flex flex-wrap gap-2 justify-end">
              {r.estado !== "confirmada" && (
                <button onClick={() => cambiarEstado(r.id, "confirmada")} className="text-xs rounded-full bg-emerald-500/20 text-emerald-300 px-3 py-1.5 hover:bg-emerald-500/30">
                  Confirmar
                </button>
              )}
              {r.estado !== "cancelada" && (
                <button onClick={() => cambiarEstado(r.id, "cancelada")} className="text-xs rounded-full bg-red-500/20 text-red-300 px-3 py-1.5 hover:bg-red-500/30">
                  Cancelar
                </button>
              )}
              <button onClick={() => eliminarReserva(r.id)} className="text-xs rounded-full bg-white/10 text-white/70 px-3 py-1.5 hover:bg-white/20">
                Borrar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}