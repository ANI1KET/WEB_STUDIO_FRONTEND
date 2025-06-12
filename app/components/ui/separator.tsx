"use client";

import * as React from "react";
import { Divider, DividerProps } from "@mui/material";

import { cn } from "@/app/lib/utils";

interface SeparatorProps extends Omit<DividerProps, "orientation"> {
  className?: string;
  decorative?: boolean;
  orientation?: "horizontal" | "vertical";
}

const Separator = React.forwardRef<HTMLHRElement, SeparatorProps>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <Divider
      ref={ref}
      role={decorative ? "presentation" : "separator"}
      orientation={orientation === "horizontal" ? "horizontal" : "vertical"}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = "Separator";

export { Separator };
