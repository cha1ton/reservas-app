// scripts/seed-superadmin.ts

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { connectDB } from "../src/lib/mongodb";
import { User } from "../src/models/User";

async function main() {
  const email = process.env.SUPERADMIN_EMAIL;
  const password = process.env.SUPERADMIN_PASSWORD;
  if (!email || !password) throw new Error("Falta SUPERADMIN_EMAIL/PASSWORD en .env.local");

  await connectDB();
  const exists = await User.findOne({ rol: "superadmin" });
  if (exists) {
    console.log("⚠️  Ya existe un superadmin:", exists.email);
    return;
  }

  const hash = await bcrypt.hash(password, 12);
  await User.create({ email, password: hash, nombre: "Superadmin", rol: "superadmin" });
  console.log("✅ Superadmin creado:", email);
}

main().finally(() => mongoose.disconnect());