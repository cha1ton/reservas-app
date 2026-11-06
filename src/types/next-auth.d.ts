// src/types/next-auth.d.ts

import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      rol: "superadmin" | "admin";
      activo: boolean;
      email?: string | null;
      name?: string | null;
    };
  }
}