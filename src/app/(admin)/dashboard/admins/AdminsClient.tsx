// src/app/(admin)/dashboard/admins/AdminsClient.tsx

"use client";

import { useActionState, useState } from "react";
import { crearAdmin, toggleActivo } from "./actions";

type Admin = { id: string; email: string; nombre: string; activo: boolean };

export default function AdminsClient({ admins }: { admins: Admin[] }) {
  const [state, formAction, pending] = useActionState(crearAdmin, {} as { error?: string; ok?: boolean });
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Barberos</h1>
        <button
          onClick={() => setOpen(!open)}
          className="rounded-full bg-white text-neutral-900 px-5 py-2 text-sm font-medium hover:bg-white/90 transition"
        >
          {open ? "Cerrar" : "+ Nuevo barbero"}
        </button>
      </div>

      {open && (
        <form action={formAction} className="glass p-6 grid gap-4 sm:grid-cols-3">
          <input name="nombre" placeholder="Nombre" required className="rounded-lg bg-white/5 border border-white/15 px-4 py-2" />
          <input name="email" type="email" placeholder="Email" required className="rounded-lg bg-white/5 border border-white/15 px-4 py-2" />
          <input name="password" type="password" placeholder="Contraseña (mín 8)" required minLength={8} className="rounded-lg bg-white/5 border border-white/15 px-4 py-2" />
          <div className="sm:col-span-3 flex items-center gap-3">
            <button disabled={pending} className="rounded-full bg-white text-neutral-900 px-5 py-2 text-sm font-medium disabled:opacity-60">
              {pending ? "Creando..." : "Crear"}
            </button>
            {state?.error && <p className="text-sm text-red-300">{state.error}</p>}
            {state?.ok && <p className="text-sm text-emerald-300">Creado ✅</p>}
          </div>
        </form>
      )}

      <div className="glass divide-y divide-white/10">
        {admins.length === 0 && <p className="p-6 text-white/60 text-sm">Sin barberos aún.</p>}
        {admins.map((a) => (
          <div key={a.id} className="p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">{a.nombre}</p>
              <p className="text-sm text-white/50">{a.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs px-2 py-1 rounded-full ${a.activo ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"}`}>
                {a.activo ? "Activo" : "Inactivo"}
              </span>
              <form action={async () => { await toggleActivo(a.id); }}>
                <button className="text-sm text-white/70 hover:text-white underline">
                  {a.activo ? "Desactivar" : "Activar"}
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}