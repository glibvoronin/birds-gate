const ACCESS_TOKEN_KEY = 'bg_access_token';
const REFRESH_TOKEN_KEY = 'bg_refresh_token';

export class TokenHelper {
  static setAuthToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }

  static getAuthToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  static removeAuthToken(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  static setRefreshToken(token: string): void {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  static removeRefreshToken(): void {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
}
