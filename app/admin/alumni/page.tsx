import type { Metadata } from "next";
import type { ReactElement } from "react";

import AlumniManager from "@/components/admin/AlumniManager";
import AdminRouteState from "@/components/admin/AdminRouteState";
import { createPageMetadata } from "@/lib/site";
import { getAllAlumni } from "@/lib/supabase/queries";
import type { Alumni } from "@/lib/types";

export const metadata: Metadata = createPageMetadata({
  title: "Admin Alumni",
  description: "Manage alumni profiles inside the private D'Icon School admin dashboard.",
  path: "/admin/alumni",
  noIndex: true,
});

export default async function AdminAlumniPage(): Promise<ReactElement> {
  try {
    const alumni: Alumni[] = await getAllAlumni();

    return <AlumniManager alumni={alumni} />;
  } catch {
    return (
      <AdminRouteState
        description="Check the alumni table permissions and try this section again."
        message="The alumni module could not load right now."
        title="Alumni Error"
      />
    );
  }
}