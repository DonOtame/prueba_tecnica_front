import { Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { LoginResponse, MessageResponse } from '../models';
import { ApiService } from '.';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  private baseUrl = environment.baseUrl + '/auth';

  public login(username: string, password: string): Promise<LoginResponse> {
    return this.request<LoginResponse>(`${this.baseUrl}/login`, {
      method: 'POST',
      body: { username, password },
    });
  }

  public register(username: string, password: string): Promise<MessageResponse> {
    return this.request<MessageResponse>(`${this.baseUrl}/register`, {
      method: 'POST',
      body: { username, password },
    });
  }

  public logout(): Promise<void> {
    return this.request<void>(`${this.baseUrl}/logout`, { method: 'POST' });
  }
}
