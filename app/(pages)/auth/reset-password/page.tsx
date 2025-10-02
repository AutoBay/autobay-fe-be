"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
// import router from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ButtonWithLoading from "@/custom-components/button-with-loading-state/ButtonWithLoading";
import { fireBaseClientAuth } from "@/lib/client/client-config";
import { resetPasswordSchema } from "@/lib/client/schemas/reset-password-schema";

export default function ResetPasswordPage() {
  const params = new URLSearchParams(window.location.search);
  const actionCode = params.get("oobCode");

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    try {
      await verifyPasswordResetCode(fireBaseClientAuth, actionCode || "");
      await confirmPasswordReset(fireBaseClientAuth, actionCode || "", values.password);
      toast.success("Password reset successfully. You can now log in with your new password.");
    } catch (error) {
      console.error("Passwowrd reset failed:", error);
      toast.error("Password reset failed. Please try again.");
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="w-1/3">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>Enter your new password to reset your password.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                {/* New Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="password">New Password</FormLabel>
                      <FormControl>
                        <Input autoComplete="new-password" id="password" placeholder="******" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <ButtonWithLoading className="w-full" loading={isPending} text="Reset Password" type="submit" />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
