import { Request, Response } from "express";
import { RegisterService } from "../services/auth.services.js";
import { createRegisterSchema } from "../utils/auth.schemas.js";
import { AppError } from "../utils/app.error.js";

export default class AuthController {
  public login = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({ message: "Hello" });
  };

  public register = async (req: Request, res: Response): Promise<any> => {
    const result = createRegisterSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json(result.error.issues);
    }

    try {
      const registerService = new RegisterService();
      const user = await registerService.execute(result.data);
      res
        .status(201)
        .json({ message: `User ${user.name} created successfuly` });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          message: error.message,
        });
      }

      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  };
}
