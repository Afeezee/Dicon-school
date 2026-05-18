"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Clapperboard, Mail, Send } from "lucide-react";
import { useState, type ReactElement } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { submitEnquiryAction } from "@/app/actions";
import { CONTACT_LINKS, SITE_SETTINGS_FALLBACK } from "@/lib/constants";
import { contactFormSchema, type ContactFormValues } from "@/lib/form-schemas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SectionHeader from "@/components/ui/SectionHeader";
import { Textarea } from "@/components/ui/textarea";

function getContactIcon(label: string): ReactElement {
  if (label.includes("Instagram")) {
    return <Camera className="h-5 w-5" />;
  }

  if (label === "YouTube") {
    return <Clapperboard className="h-5 w-5" />;
  }

  return <Mail className="h-5 w-5" />;
}

export default function ContactSection(): ReactElement {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues): Promise<void> {
    setIsSubmitting(true);
    const response = await submitEnquiryAction(values);
    setIsSubmitting(false);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    setSubmitted(true);
    toast.success(response.message);
  }

  return (
    <section className="section-padding pt-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <SectionHeader subtitle="For admissions questions, collaborations, and direct enquiries, reach out through the channels below or use the quick enquiry form." tag="Contact" title="Let&apos;s *Talk*" />

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Card className="h-full">
            <CardContent className="space-y-8 p-8">
              <div className="space-y-3">
                <p className="font-accent text-sm uppercase tracking-[0.3em] text-gold-light">{SITE_SETTINGS_FALLBACK.school_name}</p>
                <h2 className="font-display text-4xl text-dicon-text">{SITE_SETTINGS_FALLBACK.school_tagline}</h2>
                <p className="text-lg leading-relaxed text-dicon-muted">For urgent enquiries, DM us on Instagram @dicon_schoolofpfa.</p>
              </div>

              <div className="space-y-4">
                <p className="font-accent text-sm uppercase tracking-[0.28em] text-gold-light">Follow us</p>
                <div className="space-y-3">
                  {CONTACT_LINKS.map((link): ReactElement => (
                    <a className="flex items-center gap-3 rounded-[1.25rem] border border-dicon-border bg-dicon-surface px-4 py-4 text-dicon-text transition hover:border-gold/35 hover:text-gold-light" href={link.href} key={link.href} rel="noreferrer" target="_blank">
                      {getContactIcon(link.label)}
                      <span className="flex flex-col">
                        <span className="font-accent text-xs uppercase tracking-[0.18em] text-dicon-muted">{link.label}</span>
                        <span className="text-base">{link.value}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Enquiry Form</CardTitle>
              <CardDescription>Send a message and the school team will respond as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="rounded-[1.5rem] border border-gold/25 bg-gold/10 p-6 text-lg text-dicon-text">
                  Message sent! We&apos;ll be in touch soon.
                </div>
              ) : (
                <Form {...form}>
                  <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }): ReactElement => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }): ReactElement => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }): ReactElement => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Tell us how we can help." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button disabled={isSubmitting} type="submit">
                      <Send className="mr-2 h-4 w-4" />
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}