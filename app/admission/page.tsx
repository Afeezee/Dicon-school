import type { Metadata } from "next";

import AdmissionForm from "@/components/admission/AdmissionForm";
import { createPageMetadata } from "@/lib/site";
import type { ReactElement } from "react";

export const metadata: Metadata = createPageMetadata({
  title: "Admission",
  description:
    "Start your application to D'Icon School of Performing Arts and apply for acting, directing, scriptwriting, or production training in Yoruba Nollywood.",
  path: "/admission",
});

export default function AdmissionPage(): ReactElement {
  return <AdmissionForm />;
}