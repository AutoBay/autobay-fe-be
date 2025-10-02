import z from "zod";
import { emailSchema } from "./email-schema";

export const ContactFormSchema = z.object({
  firstname: z.string().min(2, "First name must be at least 2 characters").max(50, "First name must be at most 50 characters"),
  lastname: z.string().min(2, "Last name must be at least 2 characters").max(50, "Last name must be at most 50 characters"),
  email: emailSchema.shape.email,
  subject: z.string().min(3, "Subject must be at least 3 characters").max(100, "Subject must be at most 100 characters"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000, "Message must be at most 2000 characters"),
});
