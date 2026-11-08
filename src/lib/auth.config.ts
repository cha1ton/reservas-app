// src/lib/auth.config.ts

import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  providers: [], // se llenan en auth.ts (Node)
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        (token as any).rol = (user as any).rol;
        (token as any).activo = (user as any).activo;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        (session.user as any).id = token.sub;
        (session.user as any).rol = (token as any).rol;
        (session.user as any).activo = (token as any).activo;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;