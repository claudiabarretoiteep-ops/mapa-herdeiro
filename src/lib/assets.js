/**
 * Resolve public asset paths using Vite's base URL.
 * Usage: asset("/images/eixo/v3/eixo0.png") → "/eixos/images/eixo/v3/eixo0.png"
 */
const BASE = import.meta.env.BASE_URL;

export function asset(path) {
  // Remove leading slash to avoid double-slash
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return BASE + clean;
}
