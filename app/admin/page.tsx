import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import type { ReactElement } from "react";

import ApplicationsBoard from "@/components/admin/ApplicationsBoard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createPageMetadata } from "@/lib/site";
import { getAdmissions, getMessages } from "@/lib/supabase/queries";
import type { Admission, ContactMessage } from "@/lib/types";
import { hasSupabaseEnv } from "@/lib/utils";
import Link from "next/link";

export const metadata: Metadata = createPageMetadata({
  title: "Admin Dashboard",
  description: "Private admissions dashboard for D'Icon School staff.",
  path: "/admin",
  noIndex: true,
});

export default async function AdminPage(): Promise<ReactElement> {
  if (!hasSupabaseEnv()) {
    return (
      <section className="section-padding pt-10">
        <div className="mx-auto max-w-4xl">
          <Card className="border-[#a83d3d]/30 bg-[#a83d3d]/10">
            <CardHeader>
              <Badge variant="crimson">Dashboard Unavailable</Badge>
              <CardTitle className="mt-4 flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-[#f2a7a7]" />
                The school dashboard is not connected yet.
              </CardTitle>
              <CardDescription>Finish the dashboard connection settings before using applications, messages, and site updates.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    );
  }

  try {
    const [admissions, messages]: [Admission[], ContactMessage[]] = await Promise.all([getAdmissions(), getMessages()]);
    const applicationCount: number = admissions.length;
    const messageCount: number = messages.length;

    return (
      <div className="space-y-8">
        <Card className="border-gold/20 bg-[linear-gradient(160deg,rgba(200,168,75,0.12),rgba(7,7,7,0.96))]">
          <CardContent className="flex flex-col gap-8 p-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <Badge>Dashboard</Badge>
              <div className="space-y-3">
                <h1 className="font-display text-5xl leading-tight text-dicon-text">Applications and messages, at a glance.</h1>
                <p className="max-w-3xl text-lg leading-relaxed text-dicon-muted">
                  Review the latest applications, keep messages visible, and move straight to the work that needs attention.
                </p>
              </div>
              <p className="font-accent text-sm uppercase tracking-[0.24em] text-gold-light">Admin workspace ready</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Button asChild={true} variant="outline">
                <Link href="/admin/applications">Open Applications</Link>
              </Button>
              <Button asChild={true} variant="secondary">
                <Link href="/admin/messages">Open Messages</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardContent className="space-y-3 p-6">
              <p className="font-accent text-xs uppercase tracking-[0.24em] text-gold-light">Applications</p>
              <p className="font-display text-4xl text-dicon-text">{applicationCount}</p>
              <p className="text-base leading-relaxed text-dicon-muted">Applications sent through the admissions form.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-3 p-6">
              <p className="font-accent text-xs uppercase tracking-[0.24em] text-gold-light">Messages</p>
              <p className="font-display text-4xl text-dicon-text">{messageCount}</p>
              <p className="text-base leading-relaxed text-dicon-muted">Contact messages sent through the public message form.</p>
            </CardContent>
          </Card>
        </div>

        <ApplicationsBoard admissions={admissions} />
      </div>
    );
  } catch (error) {
    console.error("Admin dashboard data load failed", error);

    return (
      <div className="mx-auto max-w-4xl">
        <Card>
          <CardHeader>
            <Badge variant="outline">Admissions Error</Badge>
            <CardTitle className="mt-4">The dashboard opened, but the latest records could not be loaded.</CardTitle>
            <CardDescription>Check the dashboard connection and try again.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed text-dicon-muted">You are signed in, but the latest applications and messages are not available right now.</p>
          </CardContent>
        </Card>
      </div>
    );
  }
}