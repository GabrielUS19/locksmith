import { z } from "zod";
import { passwordSchema } from "./zod.schemas.js";

export const createRegisterSchema = z
  .object({
    name: z.string(),
    email: z.email("Formato de Email Inválido").trim().toLowerCase(),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterUserDTO = z.infer<typeof createRegisterSchema>;
