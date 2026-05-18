import Link from "next/link";
import type { ReactElement } from "react";

import SectionHeader from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";

export default function NotFound(): ReactElement {
  return (
    <section className="section-padding flex min-h-[70vh] items-center justify-center">
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeader
          align="center"
          subtitle="The page you requested is not available, but the school, filmography, alumni stories, and admissions path are all still within reach."
          tag="404"
          title="Scene *Missing*"
        />
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild={true}>
            <Link href="/">Return Home</Link>
          </Button>
          <Button asChild={true} variant="outline">
            <Link href="/admission">Go to Admission</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}