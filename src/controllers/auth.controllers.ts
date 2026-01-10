import { Request, Response } from "express";
import {
  LoginService,
  RefreshTokenService,
  RegisterService,
} from "../services/auth.services.js";
import type { LoginUserDTO, RegisterUserDTO } from "../utils/auth.schemas.js";
import { AppError } from "../errors/app.error.js";
import strict from "node:assert/strict";

export default class AuthController {
  // Controller para rota de login
  public login = async (req: Request, res: Response): Promise<void> => {
    const data: LoginUserDTO = req.body;

    const loginService = new LoginService();
    const { accessToken, rawToken, expiresAt } =
      await loginService.execute(data);

    res.cookie("refreshToken", rawToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: expiresAt,
    });

    res
      .status(200)
      .json({ message: `Bem vindo de volta`, accessToken: accessToken });
  };

  // Controller para rota de registro
  public register = async (req: Request, res: Response): Promise<void> => {
    const data: RegisterUserDTO = req.body;

    const registerService = new RegisterService();
    const user = await registerService.execute(data);

    res.status(201).json({ message: `User ${user.name} created successfuly` });
  };

  // Controller para endpoint de Refresh Token
  public refreshToken = async (req: Request, res: Response): Promise<void> => {
    const token: string = req.cookies.refreshToken;

    if (!token) {
      throw new AppError("Token não enviado", 401);
    }

    const refreshTokenService = new RefreshTokenService();
    const { accessToken, rawToken, expiresAt } =
      await refreshTokenService.execute(token);

    res.cookie("refreshToken", rawToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: expiresAt,
    });

    res
      .status(200)
      .json({ message: "Access Token renovado", accessToken: accessToken });
  };
}
