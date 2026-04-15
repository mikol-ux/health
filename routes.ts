/**
 * does not require authentication
 *@type {string[]}
 */
export const publicRoutes = ["/", "/about", "/contact", "/dashboard", "/LOGIN"];

/**
 * used for authentication
 *@type {string[]}
 */
export const authRoutes = ["/"];

/**
 * the prefix for authentication
 *@type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * default redirect after login
 *@type {string}
 */
export const DEFAULT_LOGON_REDIRECT = "/dashboard";

/**
 * Route prefixes and which roles are allowed to access them.
 * Any route not listed here is accessible by all authenticated users.
 * @type {Record<string, string[]>}
 */
export const roleRoutes: Record<string, string[]> = {
  "/patients": ["DOCTOR", "NURSE", "STAFF"],
  "/patient": ["DOCTOR", "NURSE", "STAFF"],
  "/medical_record": ["DOCTOR"],
  "/report": ["DOCTOR"],
  "/medication": ["DOCTOR"],
  "/injection": ["NURSE"],
  "/appointments": ["DOCTOR", "NURSE", "STAFF"],
  "/appointment": ["PATIENT"],
};
