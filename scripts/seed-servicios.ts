// scripts/seed-servicios.ts

import mongoose from "mongoose";
import { connectDB } from "../src/lib/mongodb";
import { Servicio } from "../src/models/Servicio";

async function main() {
  await connectDB();
  const count = await Servicio.countDocuments({});
  if (count > 0) { console.log("⚠️ Ya hay servicios:", count); return; }

  await Servicio.insertMany([
    { nombre: "Corte clásico", descripcion: "Corte a tijera + máquina", duracionMin: 30, precio: 20 },
    { nombre: "Corte + barba", descripcion: "Corte y perfilado de barba", duracionMin: 45, precio: 30 },
    { nombre: "Afeitado premium", descripcion: "Afeitado con toalla caliente", duracionMin: 30, precio: 25 },
    { nombre: "Diseño de cejas", descripcion: "Perfilado rápido", duracionMin: 15, precio: 10 },
  ]);
  console.log("✅ Servicios creados");
}
main().finally(() => mongoose.disconnect());