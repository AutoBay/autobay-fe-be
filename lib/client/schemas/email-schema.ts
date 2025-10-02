import z from "zod";

export const emailSchema = z.object({
  email: z.email({ error: 'Invalid email address' }).min(1, { error: 'Email is required' }).max(255, { error: 'Max length is 255 characters' }),
}
)