import type { Metadata } from "next";

import ContactSection from "@/components/contact/ContactSection";
import { createPageMetadata } from "@/lib/site";
import type { ReactElement } from "react";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact D'Icon School of Performing Arts for admissions, collaborations, enquiries, and official social channels.",
  path: "/contact",
});

export default function ContactPage(): ReactElement {
  return <ContactSection />;
}