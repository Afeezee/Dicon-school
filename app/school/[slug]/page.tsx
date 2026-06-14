import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactElement } from "react";

import ProgrammePageContent from "@/components/school/ProgrammePageContent";
import { PROGRAMME_SLUGS, getProgrammeBySlug } from "@/lib/constants";
import { createPageMetadata } from "@/lib/site";
import type { Programme } from "@/lib/constants";

interface ProgrammePageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams(): { slug: string }[] {
  return PROGRAMME_SLUGS.map((slug: string) => ({
    slug,
  }));
}

export function generateMetadata({ params }: ProgrammePageProps): Metadata {
  const programme: Programme | undefined = getProgrammeBySlug(params.slug);

  if (!programme) {
    return createPageMetadata({
      title: "Programme Not Found",
      description: "The requested programme could not be found.",
      path: `/school/${params.slug}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: `${programme.name} Programme`,
    description: programme.summary,
    path: `/school/${programme.slug}`,
  });
}

export default function ProgrammePage({ params }: ProgrammePageProps): ReactElement {
  const programme: Programme | undefined = getProgrammeBySlug(params.slug);

  if (!programme) {
    notFound();
  }

  return <ProgrammePageContent programme={programme} />;
}
