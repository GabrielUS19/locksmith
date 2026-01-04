import crypto from "node:crypto";
import "bcrypt";

interface RefreshToken {
  rawToken: string;
  hashToken: string;
  expiresAt: Date;
}

const TOKEN_EXPIRATION_DAYS: number = 15;

export const generateRefreshToken = (): RefreshToken => {
  const rawToken: string = crypto.randomBytes(32).toString("hex");

  const hashToken: string = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + TOKEN_EXPIRATION_DAYS);

  return {
    rawToken,
    hashToken,
    expiresAt,
  };
};
