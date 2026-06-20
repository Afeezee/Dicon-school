"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { startTransition, useState, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { signInAdminAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { adminLoginSchema, type AdminLoginValues } from "@/lib/form-schemas";

interface AdminLoginFormProps {
  isConfigured: boolean;
  redirectedFrom?: string;
}

export default function AdminLoginForm({ isConfigured, redirectedFrom }: AdminLoginFormProps): ReactElement {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const form = useForm<AdminLoginValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: AdminLoginValues): Promise<void> {
    setIsSubmitting(true);
    const response = await signInAdminAction(values);
    setIsSubmitting(false);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    toast.success(response.message);
    startTransition((): void => {
      router.push("/admin");
      router.refresh();
    });
  }

  return (
    <section className="section-padding pt-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="admin-hero border-gold/20">
          <CardContent className="flex h-full flex-col justify-between gap-8 p-8">
            <div className="space-y-5">
              <p className="font-accent text-sm uppercase tracking-[0.3em] text-gold-light">Admin Portal</p>
              <h1 className="font-display text-5xl leading-tight text-dicon-text">Manage admissions, review applicants, and keep the school pipeline moving.</h1>
              <p className="text-lg leading-relaxed text-dicon-muted">
                This private dashboard is for the D&apos;Icon School team. Sign in with a staff account that has dashboard access.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-dicon-border bg-dicon-surface/60 p-5">
                <p className="font-accent text-xs uppercase tracking-[0.24em] text-gold-light">Private Access</p>
                <p className="mt-3 text-base leading-relaxed text-dicon-muted">This area opens only after a successful staff sign-in.</p>
              </div>
              <div className="rounded-[1.5rem] border border-dicon-border bg-dicon-surface/60 p-5">
                <p className="font-accent text-xs uppercase tracking-[0.24em] text-gold-light">Workflow</p>
                <p className="mt-3 text-base leading-relaxed text-dicon-muted">Review new applications, reply to messages, and keep school updates moving for the team.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              {isConfigured ? <ShieldCheck className="h-6 w-6 text-gold-light" /> : <ShieldAlert className="h-6 w-6 text-[#f2a7a7]" />}
              Admin Sign-In
            </CardTitle>
            <CardDescription>{redirectedFrom ? `Sign in to continue to ${redirectedFrom}.` : "Use your staff email and password."}</CardDescription>
          </CardHeader>
          <CardContent>
            {isConfigured ? (
              <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }): ReactElement => (
                      <FormItem>
                        <FormLabel>Admin Email</FormLabel>
                        <FormControl>
                          <Input autoComplete="email" placeholder="admin@diconschool.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }): ReactElement => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input autoComplete="current-password" placeholder="Enter your password" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button disabled={isSubmitting} type="submit">
                    {isSubmitting ? "Signing In..." : "Open Dashboard"}
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="space-y-5 rounded-[1.5rem] border border-[#a83d3d]/30 bg-[#a83d3d]/10 p-6">
                <p className="text-lg leading-relaxed text-dicon-text">The admin portal is not ready yet. Finish the dashboard connection settings before signing in.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}