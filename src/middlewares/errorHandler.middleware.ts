import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../errors/app.error.js";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): Response => {
  // verifica se é um erro do Zod
  if (error instanceof z.ZodError) {
    return res.status(400).json({
      status: "error",
      message: "Erro de validação",
      errors: z.flattenError(error).fieldErrors,
    });
  }

  // Verifica se é um erro esperado
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
      errors: null,
    });
  }

  console.error("ERRO INTERNO.", error);

  return res.status(500).json({
    status: "error",
    message: "Ocorreu um erro interno no servidor",
    errors: null,
  });
};
