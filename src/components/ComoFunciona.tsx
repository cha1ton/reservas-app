// src/components/ComoFunciona.tsx

const pasos = [
  { n: "01", t: "Elige tu servicio", d: "Corte, barba, combo… lo que necesites." },
  { n: "02", t: "Escoge fecha y hora", d: "Consulta disponibilidad en tiempo real." },
  { n: "03", t: "Confirma y listo", d: "Recibe confirmación. Solo llega a la cita." },
];

export default function ComoFunciona() {
  return (
    <section id="como" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-4xl font-bold text-center mb-14">¿Cómo funciona?</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {pasos.map((p) => (
            <div key={p.n} className="glass p-8">
              <span className="text-5xl font-bold text-white/20">{p.n}</span>
              <h3 className="mt-4 text-xl font-semibold">{p.t}</h3>
              <p className="mt-2 text-white/60 text-sm">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}