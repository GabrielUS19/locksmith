import { Request, Response } from "express";
import { LoginService, RegisterService } from "../services/auth.services.js";
import type { LoginUserDTO, RegisterUserDTO } from "../utils/auth.schemas.js";

export default class AuthController {
  public login = async (req: Request, res: Response): Promise<void> => {
    const data: LoginUserDTO = req.body;

    const loginService = new LoginService();
    const { accessToken, rawToken, expiresAt } =
      await loginService.execute(data);

    res.cookie("refreshToken", rawToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: expiresAt,
    });

    res
      .status(200)
      .json({ message: `Bem vindo de volta`, accessToken: accessToken });
  };

  // Controller da rota de registro
  public register = async (req: Request, res: Response): Promise<void> => {
    const data: RegisterUserDTO = req.body;

    const registerService = new RegisterService();
    const user = await registerService.execute(data);

    res.status(201).json({ message: `User ${user.name} created successfuly` });
  };
}
