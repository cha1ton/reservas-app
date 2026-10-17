// src/components/Navbar.tsx

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav className="glass mx-auto mt-4 max-w-6xl flex items-center justify-between px-6 py-3">
        <Link href="/" className="font-semibold text-lg tracking-tight">
          ✂️ Aurora
        </Link>
        <ul className="hidden md:flex gap-8 text-sm text-white/80">
          <li><Link href="#servicios" className="hover:text-white transition">Servicios</Link></li>
          <li><Link href="#como" className="hover:text-white transition">Cómo funciona</Link></li>
          <li><Link href="#contacto" className="hover:text-white transition">Contacto</Link></li>
        </ul>
        <Link
          href="/reservar"
          className="rounded-full bg-white text-neutral-900 px-5 py-2 text-sm font-medium hover:bg-white/90 transition"
        >
          Reservar
        </Link>
      </nav>
    </header>
  );
}