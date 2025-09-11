export interface AuthData {
  username: string;
  token: string;
  expiresIn: number;
}

export interface LoginResponse {
  data: AuthData;
  message: string;
}

export interface ErrorResponse {
  status: number;
  message: string | null;
  errors: any | null;
}
