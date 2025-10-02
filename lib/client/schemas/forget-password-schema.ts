
import z from "zod";

export const forgetPasswordSchema = z.object({
  email: z.email().min(1, { error: "Email is required" }),
});
