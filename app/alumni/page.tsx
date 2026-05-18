import type { Metadata } from "next";

import AlumniSection from "@/components/alumni/AlumniSection";
import { loadAlumni } from "@/lib/content";
import { createPageMetadata } from "@/lib/site";
import type { Alumni } from "@/lib/types";
import type { ReactElement } from "react";

export const metadata: Metadata = createPageMetadata({
  title: "Alumni",
  description:
    "Meet the actors and filmmakers who trained under D'Icon School of Performing Arts and carried its legacy into Yoruba Nollywood and beyond.",
  path: "/alumni",
});

export default async function AlumniPage(): Promise<ReactElement> {
  const alumni: Alumni[] = await loadAlumni();

  return <AlumniSection alumni={alumni} />;
}