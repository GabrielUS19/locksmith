import { Request, Response } from "express";
import {
  LoginService,
  LogoutService,
  RefreshTokenService,
  RegisterService,
} from "../services/auth.services.js";
import type { LoginUserDTO, RegisterUserDTO } from "../utils/auth.schemas.js";
import { AppError } from "../errors/app.error.js";

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

  // Controller para rota de Refresh Token
  public refreshToken = async (req: Request, res: Response): Promise<void> => {
    const token: string | null = req.cookies.refreshToken;

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

  // Controller para rota de logout
  public logout = async (req: Request, res: Response): Promise<void> => {
    try {
      const refreshToken: string | null = req.cookies.refreshToken;

      if (!refreshToken) {
        res.status(204).send();
        return;
      }

      const logoutService = new LogoutService();
      await logoutService.execute(refreshToken);

      res.clearCookie("refreshToken");

      res.sendStatus(204);
    } catch (error) {
      console.error(`Erro no logout: ${error}`);
      res.sendStatus(204);
    }
  };
}
