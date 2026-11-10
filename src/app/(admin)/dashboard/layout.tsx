// src/app/(admin)/dashboard/layout.tsx

import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { signOut } from "@/lib/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const rol = (session.user as any).rol as "admin" | "superadmin";

  return (
    <div className="min-h-screen flex">
      <aside className="glass m-4 w-64 p-6 flex flex-col gap-6 shrink-0">
        <Link href="/dashboard" className="text-xl font-bold">✂️ Aurora</Link>

        <nav className="flex flex-col gap-2 text-sm">
          <Link href="/dashboard" className="px-3 py-2 rounded-lg hover:bg-white/10 transition">
            Resumen
          </Link>
          <Link href="/dashboard/reservas" className="px-3 py-2 rounded-lg hover:bg-white/10 transition">
            Reservas
          </Link>
          <Link href="/dashboard/servicios" className="px-3 py-2 rounded-lg hover:bg-white/10 transition">
            Servicios
          </Link>
          {rol === "superadmin" && (
            <Link href="/dashboard/admins" className="px-3 py-2 rounded-lg hover:bg-white/10 transition">
              Barberos
            </Link>
          )}
        </nav>

        <div className="mt-auto text-xs text-white/50">
          <p>{session.user.email}</p>
          <p className="uppercase tracking-wider mt-1">{rol}</p>
          <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
            <button className="mt-4 w-full rounded-lg bg-white/10 py-2 hover:bg-white/20 transition">
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}