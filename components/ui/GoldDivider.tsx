import type { ReactElement } from "react";

interface GoldDividerProps {
  className?: string;
  glow?: boolean;
  orientation?: "horizontal" | "vertical";
}

export default function GoldDivider({
  className,
  glow = false,
  orientation = "horizontal",
}: GoldDividerProps): ReactElement {
  const orientationClasses: string =
    orientation === "vertical"
      ? "h-full w-px bg-gradient-to-b from-transparent via-gold to-transparent"
      : "h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent";

  return (
    <div
      aria-hidden="true"
      className={`${orientationClasses} ${glow ? "shadow-[0_0_18px_rgba(200,168,75,0.26)]" : ""} ${className ?? ""}`.trim()}
    />
  );
}