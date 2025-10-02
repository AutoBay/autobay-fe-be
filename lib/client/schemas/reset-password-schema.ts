import z from "zod";

export const resetPasswordSchema = z.object({
  password: z.string().min(1, { error: "Password is required" }),
  confirmPassword: z.string().min(1, { error: "Confirm password is required" }),
});
