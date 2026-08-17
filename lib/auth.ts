// Simple admin auth — replace with NextAuth / JWT in production
const ADMIN_EMAIL = "admin@mintgro.com";
const ADMIN_PASSWORD = "admin123";

export function validateCredentials(email: string, password: string): boolean {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

export function createSession(): string {
  // In production, use JWT or session cookies
  return Buffer.from(`${ADMIN_EMAIL}:${Date.now()}`).toString("base64");
}

export function validateSession(token: string): boolean {
  // Simple check — replace with proper JWT verification
  return !!token && token.length > 10;
}