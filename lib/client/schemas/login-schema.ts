import z from "zod";

export const loginSchema = z.object({
  email: z.email().min(1, { error: "Email is required" }),
  password: z.string().min(1, { error: "Password is required" }),
});
