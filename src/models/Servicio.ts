// src/models/Servicio.ts

import { Schema, model, models } from "mongoose";

const ServicioSchema = new Schema(
  {
    nombre: { type: String, required: true, trim: true, maxlength: 80 },
    descripcion: { type: String, maxlength: 300 },
    duracionMin: { type: Number, required: true, min: 5, max: 480 },
    precio: { type: Number, required: true, min: 0 },
    activo: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Servicio = models.Servicio || model("Servicio", ServicioSchema);