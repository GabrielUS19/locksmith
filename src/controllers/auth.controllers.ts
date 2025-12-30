import { Request, Response } from "express";
import { RegisterService } from "../services/auth.services.js";
import { type RegisterUserDTO } from "../utils/auth.schemas.js";

export default class AuthController {
  public login = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({ message: "Hello" });
  };

  public register = async (req: Request, res: Response): Promise<any> => {
    const data: RegisterUserDTO = req.body;

    const registerService = new RegisterService();
    const user = await registerService.execute(data);

    res.status(201).json({ message: `User ${user.name} created successfuly` });
  };
}
