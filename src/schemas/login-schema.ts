import { z } from "zod";

export const loginSchema = z.object({
  email: z.string({ required_error: "Email é obrigatório" }).email("Email inválido"),
  senha: z.string({ required_error: "Senha é obrigatória" }).min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export type LoginData = z.infer<typeof loginSchema>;
