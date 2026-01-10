import { JwtPayload } from "jsonwebtoken";

export interface LoginResponse {
  accessToken: string;
  rawToken: string;
  expiresAt: Date;
}

export interface TokenPayload extends JwtPayload {
  sub: string;
}

export interface RefreshTokenGenerate {
  rawToken: string;
  hashedToken: string;
  expiresAt: Date;
}
