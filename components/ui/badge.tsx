import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 font-accent text-xs uppercase tracking-[0.2em] transition",
  {
    variants: {
      variant: {
        default: "border-gold/35 bg-[linear-gradient(135deg,rgba(250,227,154,0.18),rgba(200,168,75,0.08))] text-[#ffe8b2] backdrop-blur-xl",
        secondary: "border-white/12 bg-[rgba(255,255,255,0.08)] text-dicon-text backdrop-blur-xl",
        outline: "border-white/14 bg-transparent text-[#ffe8b2]",
        crimson: "border-crimson/40 bg-[rgba(178,34,34,0.14)] text-[#ffd7d7] backdrop-blur-xl",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps): JSX.Element {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };