import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Mínimo 8 caracteres")
  .trim()
  .regex(/[a-z]/, "Pelo menos 1 letra minúscula")
  .regex(/[A-Z]/, "Pelo menos 1 letra maiúscula")
  .regex(/[0-9]/, "Pelo menos 1 número")
  .regex(/[^a-zA-Z0-9]/, "Pelo menos 1 caractére especial");
