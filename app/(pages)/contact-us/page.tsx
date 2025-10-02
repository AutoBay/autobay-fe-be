"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import ButtonWithLoading from "@/custom-components/button-with-loading-state/ButtonWithLoading";
import type { ContactFormValues } from "@/lib/client/client-definitions";
import { clientFeatureFlags } from "@/lib/client/client-feature-flags";
import { ContactFormSchema } from "@/lib/client/schemas/contact-us-schema";
import contactUs from "@/lib/client/services/contact-us";

const ContactUsPage = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      subject: "",
      message: "",
    },
    mode: clientFeatureFlags.reactFormHooksModeContactUs,
  });

  const { isPending, mutateAsync: useContactUsMutation } = useMutation({
    mutationFn: (values: ContactFormValues) => contactUs(values),
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      await useContactUsMutation(values);
      toast.success("Message sent successfully!");
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="py-32">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
        <div className="mx-auto flex max-w-sm flex-col justify-between gap-10">
          <div className="text-center lg:text-left">
            <h1 className="mb-2 font-semibold text-5xl lg:mb-1 lg:text-6xl">Contact Us</h1>
            <p className="text-muted-foreground">We'd love to hear from you! Please fill out the form below.</p>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-xl flex-col gap-6 rounded-lg border p-10">
          <Form {...form}>
            <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input id="firstname" placeholder="First Name" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input id="lastname" placeholder="Last Name" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input id="email" placeholder="Email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel> {/* Changed from Input to Select */}
                    <FormControl>
                      <Select defaultValue={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full" defaultChecked={true} id="subject">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general-inquiry">General Inquiry</SelectItem>
                          <SelectItem value="technical-support">Technical Support</SelectItem>
                          <SelectItem value="billing-question">Billing Question</SelectItem>
                          <SelectItem value="partnership-opportunity">Partnership Opportunity</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea id="message" placeholder="Type your message here." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ButtonWithLoading className="w-full" loading={isPending} text="Send Message" />
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
