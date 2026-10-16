// src/models/User.ts

import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false }, // hash bcrypt
    nombre: { type: String, required: true, trim: true, maxlength: 60 },
    rol: { type: String, enum: ["cliente", "admin"], default: "cliente" },
  },
  { timestamps: true }
);

export const User = models.User || model("User", UserSchema);