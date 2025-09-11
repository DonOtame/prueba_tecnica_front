import { inject, Injectable } from '@angular/core';
import { AuthStorageService } from './auth-storage.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthFacadeService {
  private authApi = inject(AuthService);
  private authStorage = inject(AuthStorageService);

  async login(username: string, password: string) {
    const response = await this.authApi.login(username, password);
    this.authStorage.setSession(
      response.data.token,
      response.data.username,
      response.data.expiresIn
    );
  }

  async register(username: string, password: string) {
    await this.authApi.register(username, password);
  }

  async logout() {
    await this.authApi.logout();
    this.authStorage.clearSession();
  }

  getToken() {
    return this.authStorage.getToken();
  }

  getUsername() {
    return this.authStorage.getUsername();
  }

  isSessionValid() {
    return this.authStorage.isSessionValid();
  }
}
