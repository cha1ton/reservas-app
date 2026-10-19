// src/components/Footer.tsx

import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contacto" className="px-6 pt-24 pb-10">
      <div className="mx-auto max-w-6xl">
        {/* Bloque superior */}
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold tracking-tight">✂️ Aurora</h3>
            <p className="mt-3 text-white/60 max-w-sm text-sm leading-relaxed">
              Barbería de barrio con estándar premium. Reserva online, llega,
              y disfruta tu corte sin esperas.
            </p>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest text-white/40 mb-4">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="#servicios" className="hover:text-white transition">Servicios</Link></li>
              <li><Link href="#como" className="hover:text-white transition">Cómo funciona</Link></li>
              <li><Link href="/reservar" className="hover:text-white transition">Reservar</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest text-white/40 mb-4">
              Contacto
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Av. Principal 123, Lima</li>
              <li>+51 999 999 999</li>
              <li>hola@aurora.pe</li>
            </ul>
          </div>
        </div>

        {/* Separador + bottom */}
        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Aurora Barbería. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white/70 transition">Instagram</Link>
            <Link href="#" className="hover:text-white/70 transition">TikTok</Link>
            <Link href="#" className="hover:text-white/70 transition">WhatsApp</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}