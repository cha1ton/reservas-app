// src/components/Servicios.tsx

const servicios = [
  { nombre: "Corte clásico", duracion: "30 min", precio: 20, icono: "✂️" },
  { nombre: "Corte + barba", duracion: "45 min", precio: 30, icono: "🪒" },
  { nombre: "Afeitado premium", duracion: "30 min", precio: 25, icono: "🧴" },
  { nombre: "Diseño de cejas", duracion: "15 min", precio: 10, icono: "✨" },
];

export default function Servicios() {
  return (
    <section id="servicios" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-4">Nuestros servicios</h2>
        <p className="text-center text-white/60 mb-14">Precios claros. Tiempos reales.</p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {servicios.map((s) => (
            <div key={s.nombre} className="glass p-6 hover:bg-white/15 transition">
              <div className="text-3xl mb-4">{s.icono}</div>
              <h3 className="text-lg font-semibold">{s.nombre}</h3>
              <p className="text-sm text-white/60 mt-1">{s.duracion}</p>
              <p className="mt-4 text-2xl font-bold">S/ {s.precio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}