import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USERNAME_KEY = 'auth_username';
  private readonly EXPIRATION_KEY = 'auth_expiresIn';

  public setSession(token: string, username: string, expiresIn: number): void {
    const expirationTime = Date.now() + expiresIn;
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USERNAME_KEY, username);
    localStorage.setItem(this.EXPIRATION_KEY, expirationTime.toString());
  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public getUsername(): string | null {
    return localStorage.getItem(this.USERNAME_KEY);
  }

  public getExpiresIn(): number | null {
    const expiresIn = localStorage.getItem(this.EXPIRATION_KEY);
    return expiresIn ? parseInt(expiresIn) : null;
  }

  public clearSession(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USERNAME_KEY);
    localStorage.removeItem(this.EXPIRATION_KEY);
  }

  public isSessionValid(): boolean {
    const expiration = localStorage.getItem(this.EXPIRATION_KEY);
    if (!expiration) return false;

    const isValid = Date.now() < +expiration;
    if (!isValid) this.clearSession();

    return isValid;
  }
}
