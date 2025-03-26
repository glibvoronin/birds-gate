const ACCESS_TOKEN_KEY = 'bg_access_token';

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
}
