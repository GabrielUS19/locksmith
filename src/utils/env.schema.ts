import { z } from "zod";

const envSchema = z.object({
  JWT_SECRET: z.string().min(1, "JWT_SECRET é obrigatório"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL é obrigatório"),
});

export const env = envSchema.parse(process.env);
