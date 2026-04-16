import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  DEFAULT_LOGON_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  roleRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req): any => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role as string | undefined;
  const hasProfile = (req.auth?.user as any)?.hasProfile as boolean | undefined;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isCreateProfile = nextUrl.pathname.startsWith("/create-profile");

  if (isApiAuthRoute) return null;
  if (isPublicRoute) return null;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGON_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn) {
    return Response.redirect(new URL("/LOGIN", nextUrl));
  }

  // Redirect new users (no profile yet) to setup, except if already there
  if (isLoggedIn && hasProfile === false && !isCreateProfile) {
    return Response.redirect(new URL("/create-profile", nextUrl));
  }

  // Prevent users who already have a profile from re-accessing create-profile
  if (isCreateProfile && hasProfile) {
    return Response.redirect(new URL("/profile", nextUrl));
  }

  // Role-based route protection
  for (const [prefix, allowedRoles] of Object.entries(roleRoutes)) {
    if (nextUrl.pathname.startsWith(prefix)) {
      if (!userRole || !allowedRoles.includes(userRole)) {
        return Response.redirect(new URL(DEFAULT_LOGON_REDIRECT, nextUrl));
      }
      break;
    }
  }

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
