import { z } from "zod";
import { passwordSchema } from "./zod.schemas.js";

// DTO para registro de usuário
export const registerSchema = z
  .object({
    name: z.string(),
    email: z.string().trim().toLowerCase().email("Formato de Email Inválido"),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterUserDTO = z.infer<typeof registerSchema>;

// DTO para login
export const loginSchema = z.object({
  email: z.string().trim().toLowerCase(),
  password: z.string(),
});

export type LoginUserDTO = z.infer<typeof loginSchema>;
