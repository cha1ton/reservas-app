// src/lib/mongodb.ts

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("Falta MONGODB_URI en .env.local");

type Cached = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
const globalWithMongoose = global as typeof globalThis & { _mongoose?: Cached };
const cached: Cached = globalWithMongoose._mongoose ?? { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!, { bufferCommands: false });
  }
  cached.conn = await cached.promise;
  globalWithMongoose._mongoose = cached;
  return cached.conn;
}