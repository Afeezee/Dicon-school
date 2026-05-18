import type { Metadata } from "next";
import { LayoutDashboard } from "lucide-react";
import type { ReactElement } from "react";

import ApplicationsBoard from "@/components/admin/ApplicationsBoard";
import AdminRouteState from "@/components/admin/AdminRouteState";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { createPageMetadata } from "@/lib/site";
import { getAdmissions } from "@/lib/supabase/queries";
import type { Admission } from "@/lib/types";

export const metadata: Metadata = createPageMetadata({
  title: "Admin Applications",
  description: "Review admission applications inside the private D'Icon School admin dashboard.",
  path: "/admin/applications",
  noIndex: true,
});

export default async function AdminApplicationsPage(): Promise<ReactElement> {
  try {
    const admissions: Admission[] = await getAdmissions();

    return (
      <div className="space-y-8">
        <Card className="border-gold/20 bg-[linear-gradient(160deg,rgba(200,168,75,0.12),rgba(7,7,7,0.96))]">
          <CardContent className="flex flex-col gap-5 p-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <Badge>Applications</Badge>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/35 bg-gold/10 text-gold-light">
                    <LayoutDashboard className="h-6 w-6" />
                  </div>
                  <h1 className="font-display text-5xl leading-tight text-dicon-text">Admissions review.</h1>
                </div>
                <p className="max-w-3xl text-lg leading-relaxed text-dicon-muted">
                  This queue isolates actual school applications from general enquiries so the team can process candidates faster.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <ApplicationsBoard
          admissions={admissions}
          heading="Admission applications."
          subtitle="Review school applicants, search the queue quickly, and update review outcomes from one focused admissions view."
        />
      </div>
    );
  } catch {
    return (
      <AdminRouteState
        description="Check the admissions table permissions and try this section again."
        message="The applications queue could not load right now."
        title="Applications Error"
      />
    );
  }
}