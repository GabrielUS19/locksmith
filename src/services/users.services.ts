import { User } from "@prisma/client";
import { ShowProfileResponse } from "../interfaces/users.interfaces.js";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../errors/app.error.js";

export class ShowProfileService {
  public execute = async (userId: string): Promise<ShowProfileResponse> => {
    const user: User | null = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    const { id, name, email, createdAt } = user;

    return { id, name, email, createdAt };
  };
}
