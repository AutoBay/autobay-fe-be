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

// TODO: Fix this page properly currently not working

// TS helper for window
declare global {
  type Window = {
    recaptchaVerifier?: RecaptchaVerifier;
    confirmationResult?: ConfirmationResult;
  };
}

export default function LoginWithPhoneNumber() {
  const router = useRouter();
  const [isPending, setPending] = useState(false);
  const recaptchaReady = useRef(false);

  fireBaseClientAuth.useDeviceLanguage();

  const form = useForm<LoginWithPhoneNumberValue>({
    resolver: zodResolver(loginWithPhoneNumberSchema),
    defaultValues: { phoneNumber: "" },
    mode: clientFeatureFlagsConfig.formMode.loginWithPhoneNumber,
  });

  useEffect(() => {
    if (recaptchaReady.current) {
      return;
    }

    // Create an invisible reCAPTCHA bound to the submit button
    window.recaptchaVerifier = new RecaptchaVerifier(fireBaseClientAuth, "sign-in-button", {
      size: "invisible",
      callback: async () => {
        // reCAPTCHA solved -> proceed with submit handler
        // No-op here; onSubmit handles the flow.
      },
      "expired-callback": () => {
        // Optional: inform user or recreate verifier
        console.warn("reCAPTCHA expired");
      },
    });

    recaptchaReady.current = true;

    return () => {
      try {
        window.recaptchaVerifier?.clear();
        window.recaptchaVerifier = undefined;
        recaptchaReady.current = false;
      } catch {
        // ignore
      }
    };
  }, []);

  const onSubmit = async (value: LoginWithPhoneNumberValue) => {
    try {
      setPending(true);

      // Ensure we have a verifier; recreate if needed
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(fireBaseClientAuth, "sign-in-button", { size: "invisible" });
      }

      // IMPORTANT: pass appVerifier as the 3rd arg
      const confirmation = await signInWithPhoneNumber(
        fireBaseClientAuth,
        value.phoneNumber, // must be E.164, e.g., "+9725XXXXXXXX"
        window.recaptchaVerifier
      );

      window.confirmationResult = confirmation;
      // Next step: take user to OTP page
      // router.push("/auth/verify-phone-number");
    } catch (error) {
      console.error("Error sending OTP:", error);
      form.setError("phoneNumber", { message: "Failed to send OTP. Please try again." });
      // Reset verifier after error to avoid “re-used” token issues
      try {
        window.recaptchaVerifier?.clear();
        window.recaptchaVerifier = undefined;
        recaptchaReady.current = false;
      } catch {
        // ignore
      }
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
                  <h1 className="font-bold text-2xl">Login with phone number</h1>
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
                          <Input autoComplete="tel" autoFocus placeholder="+1 (555) 000-0000" type="tel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* The button id must match the RecaptchaVerifier's button id */}
                  <ButtonWithLoading className="w-full" id="sign-in-button" loading={isPending} text="Send code" type="submit" variant="default" />
                </div>

                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a className="underline underline-offset-4" href={clientConfig.platform.registerUrl}>
                    Register
                  </a>
                </div>
              </form>
              {/* Not needed for invisible bound-to-button flow; safe to remove */}
              {/* <div id="recaptcha-container" /> */}
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
