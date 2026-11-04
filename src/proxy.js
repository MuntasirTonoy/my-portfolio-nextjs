import { NextResponse } from "next/server";
import { AUTH_COOKIE, readSession } from "@/lib/session";

// Server-side guard for the admin area: no valid session, no dashboard.
export function proxy(req) {
  const session = readSession(req.cookies.get(AUTH_COOKIE)?.value);
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin/dashboard") && !session) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }
  if (pathname === "/admin" && session) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/dashboard/:path*"],
};
