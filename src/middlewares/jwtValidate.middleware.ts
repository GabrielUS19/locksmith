import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../utils/env.schema.js";
import { TokenPayload } from "../interfaces/auth.interfaces.js";
import { AppError } from "../errors/app.error.js";

export const jwtvalidade = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader: string | undefined = req.headers["authorization"];

    if (!authHeader) {
      throw new AppError("Access Token is required", 401);
    }

    const token = authHeader.split(" ")[1];

    const decoded: TokenPayload = jwt.verify(
      token,
      env.JWT_SECRET,
    ) as TokenPayload;

    req.user = {
      id: decoded.sub,
    };

    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return next(new AppError("Invalid Token", 401));
    }

    if (err instanceof jwt.TokenExpiredError) {
      return next(new AppError("Expired Token", 401));
    }

    return next(err);
  }
};
