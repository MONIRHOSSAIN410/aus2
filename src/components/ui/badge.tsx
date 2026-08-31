import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border px-2 py-1 font-mono text-[9px] uppercase tracking-brand",
  {
    variants: {
      variant: {
        default: "border-blood bg-blood text-white",
        outline: "border-white/25 bg-black/50 text-white/80",
        sale: "border-blood bg-blood text-white",
        limited: "border-white/40 bg-black/70 text-white",
        new: "border-steel bg-steel/20 text-white",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
