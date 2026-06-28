import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { AUTH_COOKIE, parseUser } from "@/lib/auth";

const protectedRoutes = [
  "/dashboard",
  "/projects",
  "/inventory",
  "/purchase",
  "/vendors",
  "/labour",
  "/attendance",
  "/dpr",
  "/machinery",
  "/analytics",
  "/client",
  "/settings",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get(AUTH_COOKIE)?.value;
  const user = parseUser(authCookie ? decodeURIComponent(authCookie) : undefined);

  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isProtected && !user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/login" && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/dashboard/:path*",
    "/projects/:path*",
    "/inventory/:path*",
    "/purchase/:path*",
    "/vendors/:path*",
    "/labour/:path*",
    "/attendance/:path*",
    "/dpr/:path*",
    "/machinery/:path*",
    "/analytics/:path*",
    "/client/:path*",
    "/settings/:path*",
  ],
};
