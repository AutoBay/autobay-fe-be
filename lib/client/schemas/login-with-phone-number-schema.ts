import z from "zod";

export const loginWithPhoneNumberSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits long, including country code" })
    .max(15, { message: "Phone number cannot exceed 15 digits" }),
});
