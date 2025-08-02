import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Permission, Role } from "@prisma/client";

import {
  hasPermission,
  canRoutePromote,
  canRouteDashboard,
  canRouteInterested,
} from "./app/common/config/authorization";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = (await getToken({ req, secret })) as unknown as {
    role: Role;
    permission: Permission[];
  };

  if (!token) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("callbackUrl", encodeURIComponent(req.url));
    return NextResponse.redirect(loginUrl);
  }

  const pathSegments = req.nextUrl.pathname.split("/");
  const secondSegment = pathSegments[2];

  if (
    req.nextUrl.pathname.startsWith("/list") &&
    !hasPermission(secondSegment, token.permission)
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (
    req.nextUrl.pathname.startsWith("/interested") &&
    !canRouteInterested(token.role)
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (
    req.nextUrl.pathname.startsWith("/promote") &&
    !canRoutePromote(token.role)
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (
    req.nextUrl.pathname.startsWith("/dashboard") &&
    !canRouteDashboard(token.role, secondSegment)
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const thirdSegment = pathSegments[3];
  if (thirdSegment && !hasPermission(thirdSegment, token.permission)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile",
    "/list/:path*",
    "/promote/:path*",
    "/dashboard/:path*",
    "/interested/:path*",
  ],
};
