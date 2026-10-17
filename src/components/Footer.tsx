// src/components/Footer.tsx

export default function Footer() {
  return (
    <footer id="contacto" className="px-6 pb-10 pt-20">
      <div className="glass mx-auto max-w-6xl p-8 flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h3 className="text-xl font-semibold">✂️ Aurora</h3>
          <p className="text-white/60 text-sm mt-2">Av. Principal 123 · Lima, Perú</p>
        </div>
        <div className="text-sm text-white/70 space-y-1">
          <p>📞 +51 999 999 999</p>
          <p>✉️ hola@aurora.pe</p>
        </div>
        <p className="text-xs text-white/40 self-end">© {new Date().getFullYear()} Aurora</p>
      </div>
    </footer>
  );
}