// src/components/Navbar.tsx

"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-neutral-950/60 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold text-lg tracking-tight">
          ✂️ Aurora
        </Link>
        <ul className="hidden md:flex gap-8 text-sm text-white/70">
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