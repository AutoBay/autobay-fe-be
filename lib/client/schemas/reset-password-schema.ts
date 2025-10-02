import z from "zod";
import { emailSchema } from "./email-schema";
import { passwordSchema } from "./password-schema";

export const resetPasswordSchema = z.object({
  email: emailSchema.shape.email,
  confirmPassword: passwordSchema.shape.password,
  password: passwordSchema.shape.password,
});
