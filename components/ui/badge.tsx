import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 font-accent text-xs uppercase tracking-[0.2em] transition",
  {
    variants: {
      variant: {
        default: "border-gold/35 bg-[linear-gradient(135deg,rgba(250,227,154,0.18),rgba(200,168,75,0.08))] text-gold-light backdrop-blur-xl",
        secondary: "border-black/[0.08] bg-black/[0.04] text-dicon-text backdrop-blur-xl dark:border-white/12 dark:bg-white/[0.08]",
        outline: "border-black/[0.12] bg-transparent text-gold-light dark:border-white/14",
        crimson: "border-crimson/40 bg-crimson/[0.14] text-crimson dark:text-[#ffd7d7] backdrop-blur-xl",
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
