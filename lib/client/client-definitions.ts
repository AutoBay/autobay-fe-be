import type z from "zod";
import type { ContactFormSchema } from "./schemas/contact-us-schema";
import type { loginSchema } from "./schemas/login-schema";
import type { loginWithPhoneNumberSchema } from "./schemas/login-with-phone-number-schema";
import type { registerSchema } from "./schemas/register-schema";

type ReactFormHooksMode = "onBlur" | "onChange" | "onSubmit" | "onTouched" | "all" | undefined;

export type ClientFeatureFlags = {
  reactFormHooksModeLogin: ReactFormHooksMode;
  reactFormHooksModeRegister: ReactFormHooksMode;
  reactFormHooksModeContactUs: ReactFormHooksMode;
  reactFormHookModeLoginWithPhoneNumber: ReactFormHooksMode;
};

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
export type ContactFormValues = z.infer<typeof ContactFormSchema>;
export type LoginWithPhoneNumberValue = z.infer<typeof loginWithPhoneNumberSchema>;
