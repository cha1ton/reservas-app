// src/middleware.ts

import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLogged = !!req.auth;
  const isActive = (req.auth?.user as any)?.activo === true;
  const isAdmin = (req.auth?.user as any)?.rol === "admin" || (req.auth?.user as any)?.rol === "superadmin";

  // 1) Si no está logueado o está inactivo y va a /dashboard → al login
  if (pathname.startsWith("/dashboard")) {
    if (!isLogged || !isActive || !isAdmin) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // 2) Si está logueado y va a /login → al dashboard
  if (pathname === "/login" && isLogged && isActive) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};