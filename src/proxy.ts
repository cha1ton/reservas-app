// src/proxy.ts

import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";

// Instancia Edge-safe: SOLO usa auth.config (sin Mongo/bcrypt)
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLogged = !!req.auth;
  const isActive = (req.auth?.user as any)?.activo === true;
  const isAdmin =
    (req.auth?.user as any)?.rol === "admin" ||
    (req.auth?.user as any)?.rol === "superadmin";

  if (pathname.startsWith("/dashboard")) {
    if (!isLogged || !isActive || !isAdmin) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (pathname === "/login" && isLogged && isActive) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};