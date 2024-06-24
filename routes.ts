/**
 * does not require authentication
 *@type {string[]}
 */
export const publicRoutes = ["/", "/about", "/contact", "/dashboard", "/LOGIN"];
/**
 *used for authentication
 *@type {string[]}
 */
export const authRoutes = ["/"];

/**
 * the prefix for authentication
 *@type {string}
 */
export const apiAuthPrefix = "/api/auth";
/**
 * the prefix for authentication
 *@type {string}
 */
export const DEFAULT_LOGON_REDIRECT = "/create-profile";
