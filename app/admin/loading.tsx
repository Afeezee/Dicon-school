import type { ReactElement } from "react";

export default function AdminLoading(): ReactElement {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] border border-gold/20 admin-hero p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-32 rounded-full admin-skeleton" />
          <div className="h-12 max-w-2xl rounded-full admin-skeleton" />
          <div className="h-5 max-w-3xl rounded-full admin-skeleton" />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index: number): ReactElement => (
          <div className="animate-pulse rounded-[1.75rem] border border-dicon-border bg-dicon-surface/70 p-6" key={index}>
            <div className="space-y-3">
              <div className="h-4 w-28 rounded-full admin-skeleton" />
              <div className="h-10 w-32 rounded-full admin-skeleton" />
              <div className="h-4 w-full rounded-full admin-skeleton" />
              <div className="h-4 w-5/6 rounded-full admin-skeleton" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}