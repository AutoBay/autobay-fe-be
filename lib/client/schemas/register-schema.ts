import z from "zod";
import { emailSchema } from "./email-schema";
import { passwordSchema } from "./password-schema";

export const registerSchema = z.object({
  email: emailSchema.shape.email,
  confirmPassword: passwordSchema.shape.password,
  password: passwordSchema.shape.password,
  // firstName: z.string().min(1, { error: "First name is required" }),
  // lastName: z.string().min(1, { error: "Last name is required" }),
  phoneNumber: z.string().optional(),
});
