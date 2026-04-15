import { auth } from "@/auth";
import { UserRole } from "@prisma/client";

type AuthGuardSuccess = { authorized: true; userId: string; role: UserRole };
type AuthGuardFailure = { authorized: false; error: string };
type AuthGuardResult = AuthGuardSuccess | AuthGuardFailure;

/**
 * Verifies the user is logged in. Returns their userId and role, or an error.
 */
export async function requireAuth(): Promise<AuthGuardResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { authorized: false, error: "Unauthorized: please log in" };
  }
  return {
    authorized: true,
    userId: session.user.id,
    role: session.user.role,
  };
}

/**
 * Verifies the user is logged in AND has one of the allowed roles.
 * Usage: requireRole(UserRole.DOCTOR, UserRole.NURSE)
 */
export async function requireRole(
  ...roles: UserRole[]
): Promise<AuthGuardResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { authorized: false, error: "Unauthorized: please log in" };
  }
  if (!roles.includes(session.user.role)) {
    return {
      authorized: false,
      error: `Unauthorized: requires ${roles.join(" or ")} role`,
    };
  }
  return {
    authorized: true,
    userId: session.user.id,
    role: session.user.role,
  };
}
