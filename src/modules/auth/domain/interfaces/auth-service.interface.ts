export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthPayload {
  sub: string;
  email: string;
  roles: string[];
}