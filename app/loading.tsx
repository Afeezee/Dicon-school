import type { ReactElement } from "react";

import SkeletonCard from "@/components/ui/SkeletonCard";

export default function Loading(): ReactElement {
  return (
    <div className="section-padding space-y-12 pt-12">
      <section className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(200,168,75,0.14),rgba(8,8,8,0.96))] px-6 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:px-8 lg:px-12 lg:py-14">
        <div className="animate-pulse space-y-5">
          <div className="h-4 w-40 rounded-full bg-white/10" />
          <div className="h-14 max-w-3xl rounded-full bg-white/10" />
          <div className="h-6 max-w-2xl rounded-full bg-white/10" />
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="h-12 w-44 rounded-full bg-white/10" />
            <div className="h-12 w-44 rounded-full bg-white/10" />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-3">
        <SkeletonCard />
        <SkeletonCard variant="gallery" />
        <SkeletonCard variant="alumni" />
      </section>
    </div>
  );
}