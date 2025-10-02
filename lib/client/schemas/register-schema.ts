import z from "zod";

export const registerSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
  password: z.string().min(1, { error: "Password is required" }),
  confirmPassword: z.string().min(1, { error: "Confirm password is required" }),
  // firstName: z.string().min(1, { error: "First name is required" }),
  // lastName: z.string().min(1, { error: "Last name is required" }),
  phoneNumber: z.string().optional(),
});
