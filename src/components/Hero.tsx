// src/components/Hero.tsx

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-40 pb-24 px-6">
      <div className="mx-auto max-w-4xl text-center">
        <span className="glass inline-block px-4 py-1 text-xs uppercase tracking-widest text-white/80 mb-6">
          Reservas online · Sin llamadas
        </span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
          Tu mejor corte,
          <br />
          <span className="bg-gradient-to-r from-violet-300 via-blue-200 to-pink-200 bg-clip-text text-transparent">
            en un clic.
          </span>
        </h1>
        <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
          Elige tu servicio, escoge fecha y hora, y listo. Sin esperas, sin llamadas.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link
            href="/reservar"
            className="rounded-full bg-white text-neutral-900 px-7 py-3 font-medium hover:bg-white/90 transition"
          >
            Reservar ahora
          </Link>
          <Link
            href="#servicios"
            className="glass px-7 py-3 font-medium hover:bg-white/15 transition"
          >
            Ver servicios
          </Link>
        </div>
      </div>
    </section>
  );
}