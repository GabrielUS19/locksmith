import { prisma } from "../lib/prisma.js";
import type { LoginUserDTO, RegisterUserDTO } from "../utils/auth.schemas.js";
import { AppError } from "../errors/app.error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { generateRefreshToken } from "../utils/refreshtoken.js";
import { LoginResponse } from "../interfaces/auth.interfaces.js";

export class RegisterService {
  public execute = async (data: RegisterUserDTO): Promise<User> => {
    const { name, email, password } = data;

    // Verifica se o usuário já existe
    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExists) {
      throw new AppError("Usuário já cadastrado", 409);
    }

    // Criptografa a senha
    const hashPassword = await bcrypt.hash(password, 10);

    const user: User = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashPassword,
      },
    });

    return user;
  };
}

// Service para login
export class LoginService {
  public execute = async (data: LoginUserDTO): Promise<LoginResponse> => {
    const { email, password } = data;

    const user: User | null = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AppError("Email ou senha inválidos", 401);
    }

    const accessToken = jwt.sign(
      { sub: user.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "15m",
      },
    );

    const { rawToken, hashToken, expiresAt } = generateRefreshToken();

    await prisma.refreshToken.create({
      data: {
        token: hashToken,
        userID: user.id,
        expiresAt: expiresAt,
      },
    });

    return { accessToken, rawToken, expiresAt };
  };
}
