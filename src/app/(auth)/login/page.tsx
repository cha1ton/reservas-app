// src/app/(auth)/login/page.tsx

"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction } from "./actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, {} as { error?: string });

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="glass w-full max-w-md p-8">
        <Link href="/" className="text-sm text-white/60 hover:text-white">
          ← Volver
        </Link>

        <h1 className="mt-6 text-3xl font-bold">Iniciar sesión</h1>
        <p className="mt-2 text-sm text-white/60">Acceso solo para barberos y administradores.</p>

        <form action={formAction} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="text-sm text-white/70">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-1 w-full rounded-lg bg-white/5 border border-white/15 px-4 py-2.5 outline-none focus:border-white/40 transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm text-white/70">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="current-password"
              className="mt-1 w-full rounded-lg bg-white/5 border border-white/15 px-4 py-2.5 outline-none focus:border-white/40 transition"
            />
          </div>

          {state?.error && (
            <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-white text-neutral-900 py-2.5 font-medium hover:bg-white/90 transition disabled:opacity-60"
          >
            {pending ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  );
}