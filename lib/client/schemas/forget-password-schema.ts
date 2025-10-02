import z from "zod";
import { emailSchema } from "./email-schema";

export const forgetPasswordSchema = z.object({
  email: emailSchema.shape.email,
});
