import crypto from "node:crypto";
import "bcrypt";
import { RefreshTokenGenerate } from "../interfaces/auth.interfaces.js";

const TOKEN_EXPIRATION_DAYS: number = 15;

export const hashToken = (token: string): string => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  return hashedToken;
};

export const generateRefreshToken = (): RefreshTokenGenerate => {
  const rawToken: string = crypto.randomBytes(32).toString("hex");

  const hashedToken = hashToken(rawToken);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + TOKEN_EXPIRATION_DAYS);

  return {
    rawToken,
    hashedToken,
    expiresAt,
  };
};
