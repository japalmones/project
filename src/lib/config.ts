export const TOKEN_KEY = "accessToken";

// Remove trailing slashes and spaces from API base URL
function cleanUrl(url?: string) {
  return url?.trim().replace(/\/+$/, "") ?? "";
}

export const API_BASE = cleanUrl(process.env.NEXT_PUBLIC_API_BASE_URL);

export function saveToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
}

export function logoutUser() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
  }
}
