import { prisma } from "../lib/prisma.js";
import type { LoginUserDTO, RegisterUserDTO } from "../utils/auth.schemas.js";
import { AppError } from "../errors/app.error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RefreshToken, User } from "@prisma/client";
import {
  generateRefreshToken,
  hashToken,
} from "../utils/refreshtoken.generate.js";
import { LoginResponse } from "../interfaces/auth.interfaces.js";
import { env } from "../utils/env.schema.js";

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

    const accessToken = jwt.sign({ sub: user.id }, env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const { rawToken, hashedToken, expiresAt } = generateRefreshToken();

    await prisma.refreshToken.create({
      data: {
        token: hashedToken,
        userID: user.id,
        expiresAt: expiresAt,
      },
    });

    return { accessToken, rawToken, expiresAt };
  };
}

// Service para Refresh Token

export class RefreshTokenService {
  public execute = async (token: string): Promise<LoginResponse> => {
    const inputToken = hashToken(token);

    const refreshToken: RefreshToken | null =
      await prisma.refreshToken.findUnique({
        where: {
          token: inputToken,
        },
      });

    if (!refreshToken) {
      throw new AppError("Refresh Token não encontrado", 401);
    }

    if (refreshToken.revoked) {
      await prisma.refreshToken.deleteMany({
        where: {
          userID: refreshToken.userID,
        },
      });

      throw new AppError("RefreshToken Revogado");
    }

    await prisma.refreshToken.update({
      where: {
        id: refreshToken.id,
      },
      data: {
        revoked: true,
      },
    });

    const accessToken = jwt.sign({ sub: refreshToken.userID }, env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const { rawToken, hashedToken, expiresAt } = generateRefreshToken();

    await prisma.refreshToken.create({
      data: {
        token: hashedToken,
        userID: refreshToken.userID,
        expiresAt: expiresAt,
      },
    });

    return { accessToken, rawToken, expiresAt };
  };
}
