import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex translate-y-0 items-center justify-center whitespace-nowrap rounded-full font-accent text-sm uppercase tracking-[0.2em] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-dicon-bg disabled:pointer-events-none disabled:opacity-50 active:translate-y-[1px]",
  {
    variants: {
      variant: {
        default:
          "border border-gold/50 bg-[linear-gradient(135deg,rgba(250,227,154,0.96),rgba(194,140,52,0.9))] px-6 py-3 text-[#140b00] shadow-[0_18px_40px_rgba(200,168,75,0.24)] hover:-translate-y-0.5 hover:shadow-[0_26px_56px_rgba(200,168,75,0.3)]",
        outline:
          "border border-black/[0.12] bg-black/[0.03] px-6 py-3 text-dicon-text backdrop-blur-xl hover:-translate-y-0.5 hover:border-gold/50 hover:bg-black/[0.06] hover:text-gray-900 dark:border-white/14 dark:bg-white/[0.06] dark:text-[#fff0cf] dark:hover:bg-white/[0.12] dark:hover:text-white",
        ghost: "px-4 py-3 text-dicon-text hover:bg-black/[0.05] dark:hover:bg-white/[0.08]",
        secondary:
          "border border-black/[0.08] bg-dicon-surface px-6 py-3 text-dicon-text backdrop-blur-xl hover:-translate-y-0.5 hover:border-gold/35 dark:border-white/10 dark:bg-[linear-gradient(140deg,rgba(255,255,255,0.14),rgba(255,255,255,0.05)_36%,rgba(18,18,18,0.72))] dark:hover:bg-white/[0.12]",
      },
      size: {
        default: "h-12",
        sm: "h-10 px-4",
        lg: "h-14 px-7 text-base",
        icon: "h-11 w-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, size, variant, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
