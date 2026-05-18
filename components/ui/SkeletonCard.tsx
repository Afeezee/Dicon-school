import type { ReactElement } from "react";

type SkeletonCardVariant = "movie" | "alumni" | "gallery";

interface SkeletonCardProps {
  className?: string;
  variant?: SkeletonCardVariant;
}

export default function SkeletonCard({
  className,
  variant = "movie",
}: SkeletonCardProps): ReactElement {
  if (variant === "alumni") {
    return (
      <div
        className={`animate-pulse rounded-[1.75rem] border border-dicon-border bg-dicon-card p-6 ${className ?? ""}`.trim()}
      >
        <div className="mb-5 h-16 w-16 rounded-full bg-dicon-surface" />
        <div className="mb-3 h-8 w-3/4 rounded-full bg-dicon-surface" />
        <div className="mb-5 h-5 w-1/2 rounded-full bg-dicon-surface" />
        <div className="space-y-3">
          <div className="h-4 w-full rounded-full bg-dicon-surface" />
          <div className="h-4 w-full rounded-full bg-dicon-surface" />
          <div className="h-4 w-5/6 rounded-full bg-dicon-surface" />
        </div>
      </div>
    );
  }

  if (variant === "gallery") {
    return (
      <div
        className={`animate-pulse overflow-hidden rounded-[1.75rem] border border-dicon-border bg-dicon-card ${className ?? ""}`.trim()}
      >
        <div className="aspect-[4/5] w-full bg-dicon-surface" />
        <div className="space-y-3 p-5">
          <div className="h-5 w-2/3 rounded-full bg-dicon-surface" />
          <div className="h-4 w-1/3 rounded-full bg-dicon-surface" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`animate-pulse overflow-hidden rounded-[1.75rem] border border-dicon-border bg-dicon-card ${className ?? ""}`.trim()}
    >
      <div className="aspect-[3/4] w-full bg-dicon-surface" />
      <div className="space-y-3 p-5">
        <div className="h-6 w-3/4 rounded-full bg-dicon-surface" />
        <div className="h-4 w-1/3 rounded-full bg-dicon-surface" />
        <div className="h-4 w-full rounded-full bg-dicon-surface" />
      </div>
    </div>
  );
}