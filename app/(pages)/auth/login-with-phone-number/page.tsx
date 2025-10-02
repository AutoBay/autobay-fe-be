"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BorderBeam } from "@/components/ui/border-beam";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ButtonWithLoading from "@/custom-components/button-with-loading-state/ButtonWithLoading";
import { clientConfig, fireBaseClientAuth } from "@/lib/client/client-config";
import type { LoginWithPhoneNumberValue } from "@/lib/client/client-definitions";
import { clientFeatureFlagsConfig } from "@/lib/client/client-feature-flags";
import { loginWithPhoneNumberSchema } from "@/lib/client/schemas/login-with-phone-number-schema";

// TS: declare the window slot once
declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    confirmationResult?: ConfirmationResult;
  }
}

export default function LoginWithPhoneNumber() {
  const router = useRouter();
  const [isPending, setPending] = useState(false);
  const recaptchaReady = useRef(false); // avoid strict-mode double effects

  fireBaseClientAuth.useDeviceLanguage();

  const form = useForm<LoginWithPhoneNumberValue>({
    resolver: zodResolver(loginWithPhoneNumberSchema),
    defaultValues: { phoneNumber: "" },
    mode: clientFeatureFlagsConfig.formMode.loginWithPhoneNumber,
  });

  // Create a single invisible reCAPTCHA instance once
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (recaptchaReady.current) return;

    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(fireBaseClientAuth, "recaptcha-container", {
        size: "invisible",
        callback: () => {
          // solved -> proceed
        },
      });
      // Render once so it’s ready
      window.recaptchaVerifier.render().catch(console.error);
    }

    recaptchaReady.current = true;
    return () => {
      // Optional: clean up when the component unmounts
      try {
        window.recaptchaVerifier?.clear();
        window.recaptchaVerifier = undefined;
      } catch { }
      recaptchaReady.current = false;
    };
  }, []);

  const onSubmit = async (value: LoginWithPhoneNumberValue) => {
    try {
      setPending(true);

      // Ensure E.164 (“+15551234567”)
      const phone = value.phoneNumber.trim();

      if (!window.recaptchaVerifier) {
        form.setError("phoneNumber", { message: "reCAPTCHA not initialized. Reload and try again." });
        return;
      }

      const confirmation = await signInWithPhoneNumber(fireBaseClientAuth, phone, window.recaptchaVerifier);

      window.confirmationResult = confirmation;
      // Example: navigate to code entry screen
      // router.push("/auth/verify-phone-number");
    } catch (err: unknown) {
      console.error("Error sending OTP:", err);
      // Reset the widget so user can retry
      try {
        await window.recaptchaVerifier?.reset();
      } catch { }
      form.setError("phoneNumber", { message: "Failed to send OTP. Verify the number and try again." });
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-xs">
            <Form {...form}>
              <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="font-bold text-2xl">Login with Phone number</h1>
                  <p className="text-balance text-muted-foreground text-sm">Enter your phone number to receive a verification code.</p>
                </div>

                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Phone number</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="tel"
                            autoFocus
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="+15550000000"
                            type="tel"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <ButtonWithLoading className="w-full" loading={isPending} text="Send code" type="submit" variant="default" />
                </div>

                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a className="underline underline-offset-4" href={clientConfig.platform.registerUrl}>
                    Register
                  </a>
                </div>
              </form>

              {/* Must exist in the DOM before RecaptchaVerifier is created */}
              <div id="recaptcha-container" />
            </Form>

            <div className="mt-6 flex items-center justify-between text-muted-foreground text-xs">
              <Link className="hover:underline" href="/privacy-policy">
                Privacy Policy
              </Link>
              <Link className="hover:underline" href="/terms-of-service">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative hidden bg-muted lg:block">
        <Image
          alt="auth-wallpaper"
          className="absolute inset-0 object-cover"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src="/auth-wallpaper.png"
        />
        <BorderBeam duration={8} size={100} />
      </div>
    </div>
  );
}
