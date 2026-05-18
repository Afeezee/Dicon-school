import type { Metadata } from "next";

import BiographySection from "@/components/about/BiographySection";
import CareerTimeline from "@/components/about/CareerTimeline";
import SectionHeader from "@/components/ui/SectionHeader";
import { createPageMetadata } from "@/lib/site";
import type { ReactElement } from "react";

export const metadata: Metadata = createPageMetadata({
  title: "About Ibrahim Yekini",
  description:
    "Learn the story of Ibrahim Yekini (Itele D'Icon), his film career, awards, and the philosophy behind raising the next generation of Yoruba screen talent.",
  path: "/about",
});

export default function AboutPage(): ReactElement {
  return (
    <div className="pb-20 pt-8">
      <section className="section-padding pb-0">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            subtitle="The story of Ibrahim Yekini is the story of craft, reinvention, and a refusal to separate personal success from the duty to raise new talent."
            tag="About Ibrahim Yekini"
            title="The Making of *Itele D'Icon*"
          />
        </div>
      </section>
      <BiographySection />
      <CareerTimeline />
    </div>
  );
}