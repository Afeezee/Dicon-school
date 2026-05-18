import type { Metadata } from "next";

import SchoolPageContent from "@/components/school/SchoolPageContent";
import { createPageMetadata } from "@/lib/site";
import type { ReactElement } from "react";

export const metadata: Metadata = createPageMetadata({
  title: "School of Performing Arts",
  description:
    "Explore acting, scriptwriting, directing, and production training at D'Icon School of Performing Arts, with programme details, FAQs, and the school philosophy.",
  path: "/school",
});

export default function SchoolPage(): ReactElement {
  return <SchoolPageContent />;
}