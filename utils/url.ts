/**
 * Utility to generate "App URLs".
 * 
 * Logic:
 * - Uses path-based routing for all environments.
 * - Localhost: "/passageiro", "/piloto", etc.
 * - Production (Vercel): "/passageiro", "/piloto", etc.
 */

export const getAppUrl = (path: string = ''): string => {
    // Ensure path doesn't start with slash for cleaner concatenation
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    // Same origin, path-based routing for all environments
    return `${window.location.origin}/${cleanPath}`;
};

/**
 * Checks if the current window is running inside the "App Context".
 * 
 * Logic:
 * - Returns true if the path matches a known app route.
 * - Works on both localhost and production (Vercel).
 */
export const isAppContext = (): boolean => {
    const path = window.location.pathname;

    // Check if any known app route is in the path
    return (
        path.startsWith('/passageiro') ||
        path.startsWith('/piloto') ||
        path.startsWith('/cadastro-motorista') ||
        path.startsWith('/admin') ||
        path.startsWith('/empresas') ||
        path.startsWith('/app')  // Keep backward compat for localhost /app/* routes
    );
};
