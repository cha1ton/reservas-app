// src/lib/auth.ts

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "./mongodb";
import { User } from "@/models/User";
import { z } from "zod";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (creds) => {
        const parsed = z
          .object({ email: z.string().email(), password: z.string().min(8) })
          .safeParse(creds);
        if (!parsed.success) return null;

        await connectDB();
        const user = await User.findOne({ email: parsed.data.email }).select("+password");
        if (!user) return null;

        // 🔒 bloquea cuentas desactivadas
        if (!user.activo) return null;

        const ok = await bcrypt.compare(parsed.data.password, user.password);
        if (!ok) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.nombre,
          rol: user.rol,
          activo: user.activo,
        } as any;
      },
    }),
  ],
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
});