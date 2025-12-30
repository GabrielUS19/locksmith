import { User } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { RegisterUserDTO } from "../utils/auth.schemas.js";
import { AppError } from "../utils/app.error.js";
import bcrypt from "bcrypt";

export class RegisterService {
  public execute = async (data: RegisterUserDTO): Promise<User> => {
    // Verifica se o usuário já existe
    const userExists = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userExists) {
      throw new AppError("Usuário já cadastrado");
    }

    const hashPassword = await bcrypt.hash(data.password, 10);

    const user: User = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashPassword,
      },
    });

    return user;
  };
}
