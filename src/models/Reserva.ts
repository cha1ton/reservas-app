// src/models/Reserva.ts

import { Schema, model, models, Types } from "mongoose";

const ReservaSchema = new Schema(
  {
    servicio: { type: Types.ObjectId, ref: "Servicio", required: true },
    clienteNombre: { type: String, required: true, trim: true, maxlength: 60 },
    clienteTelefono: { type: String, required: true, trim: true, maxlength: 20 },
    fecha: { type: Date, required: true, index: true },
    estado: { type: String, enum: ["pendiente", "confirmada", "cancelada"], default: "pendiente" },
    notas: { type: String, maxlength: 300 },
  },
  { timestamps: true }
);

// Índice compuesto: evita doble reserva del mismo slot (a nivel de app)
ReservaSchema.index({ fecha: 1, estado: 1 });

export const Reserva = models.Reserva || model("Reserva", ReservaSchema);