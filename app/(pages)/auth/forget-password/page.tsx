"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ButtonWithLoading from "@/custom-components/button-with-loading-state/ButtonWithLoading";
import { forgetPasswordSchema } from "@/lib/client/schemas/forget-password-schema";
import forgetPw from "@/lib/client/services/forget-password";

export default function ForgetPasswordPage() {
  const form = useForm<z.infer<typeof forgetPasswordSchema>>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isPending, mutateAsync: forgetPwMutation } = useMutation({
    mutationFn: async (value: string) => forgetPw(value),
    retry: false,
    onSuccess: async () => {
      // router.push("/login");
    },
    onError: (e) => {
      console.error(e);
    },
  });

  async function onSubmit(value: z.infer<typeof forgetPasswordSchema>) {
    try {
      await forgetPwMutation(value.email);
      console.log(value);
      toast.success("Password reset successful. You can now log in with your new password.");
    } catch (error) {
      console.error("Error resetting password", error);
      toast.error("Failed to reset the password. Please try again.");
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="w-1/3">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>Enter your email address to receive a password reset link.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input autoComplete="email" id="email" placeholder="johndoe@mail.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <ButtonWithLoading className="w-full" loading={isPending} text="Send Reset Link" type="submit" />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
