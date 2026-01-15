import type { Request, Response } from "express";
import { ShowProfileService } from "../services/users.services.js";

export class UsersController {
  public show_profile = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.id;

    const showProfileService = new ShowProfileService();
    const { id, name, email, createdAt } =
      await showProfileService.execute(userId);

    res
      .status(200)
      .json({
        body: { id: id, email: email, name: name, createdAt: createdAt },
      });
  };
}
