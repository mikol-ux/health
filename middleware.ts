import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_LOGON_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  roleRoutes,
} from "./routes";

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;

  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const isLoggedIn = !!token;
  const userRole = token?.role as string | undefined;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return NextResponse.next();
  if (isPublicRoute) return NextResponse.next();

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGON_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/LOGIN", nextUrl));
  }

  for (const [prefix, allowedRoles] of Object.entries(roleRoutes)) {
    if (nextUrl.pathname.startsWith(prefix)) {
      if (!userRole || !allowedRoles.includes(userRole)) {
        return NextResponse.redirect(new URL(DEFAULT_LOGON_REDIRECT, nextUrl));
      }
      break;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
