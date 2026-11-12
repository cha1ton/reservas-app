// src/app/(public)/reservar/ReservarForm.tsx

"use client";

import { useActionState } from "react";
import { crearReserva } from "./actions";

type Servicio = { id: string; nombre: string; precio: number; duracionMin: number };

export default function ReservarForm({ servicios }: { servicios: Servicio[] }) {
  const [state, formAction, pending] = useActionState(crearReserva, {} as { error?: string; ok?: boolean });

  if (state?.ok) {
    return (
      <div className="text-center py-8">
        <p className="text-4xl">✅</p>
        <h2 className="text-xl font-semibold mt-4">¡Reserva confirmada!</h2>
        <p className="text-white/60 text-sm mt-2">Te esperamos. Si necesitas cambiar, contáctanos.</p>
        <a href="/" className="inline-block mt-6 text-sm underline text-white/70 hover:text-white">Volver al inicio</a>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="text-sm text-white/70">Servicio</label>
        <select name="servicio" required className="mt-1 w-full rounded-lg bg-white/5 border border-white/15 px-4 py-2.5 outline-none focus:border-white/40">
          <option value="">Selecciona…</option>
          {servicios.map((s) => (
            <option key={s.id} value={s.id} className="bg-neutral-900">
              {s.nombre} — S/ {s.precio} ({s.duracionMin} min)
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm text-white/70">Nombre</label>
        <input name="clienteNombre" required minLength={2} maxLength={60} className="mt-1 w-full rounded-lg bg-white/5 border border-white/15 px-4 py-2.5 outline-none focus:border-white/40" />
      </div>

      <div>
        <label className="text-sm text-white/70">Teléfono</label>
        <input name="clienteTelefono" required pattern="[0-9+\-\s]{6,20}" className="mt-1 w-full rounded-lg bg-white/5 border border-white/15 px-4 py-2.5 outline-none focus:border-white/40" />
      </div>

      <div>
        <label className="text-sm text-white/70">Fecha y hora</label>
        <input name="fecha" type="datetime-local" required className="mt-1 w-full rounded-lg bg-white/5 border border-white/15 px-4 py-2.5 outline-none focus:border-white/40" />
      </div>

      <div>
        <label className="text-sm text-white/70">Notas (opcional)</label>
        <textarea name="notas" maxLength={300} rows={2} className="mt-1 w-full rounded-lg bg-white/5 border border-white/15 px-4 py-2.5 outline-none focus:border-white/40" />
      </div>

      {state?.error && (
        <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{state.error}</p>
      )}

      <button disabled={pending} className="w-full rounded-full bg-white text-neutral-900 py-2.5 font-medium hover:bg-white/90 disabled:opacity-60">
        {pending ? "Reservando..." : "Confirmar reserva"}
      </button>
    </form>
  );
}