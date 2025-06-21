"use client";

import * as React from "react";

import { cn } from "@/app/lib/utils";

interface DrawerHeaderProps {
  className?: string;
  children?: React.ReactNode;
}

const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("grid gap-1.5 py-4 text-center sm:text-left", className)}
      {...props}
    >
      {children}
    </div>
  )
);
DrawerHeader.displayName = "DrawerHeader";

interface DrawerFooterProps {
  className?: string;
  children?: React.ReactNode;
}

const DrawerFooter = React.forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    >
      {children}
    </div>
  )
);
DrawerFooter.displayName = "DrawerFooter";

export { DrawerHeader, DrawerFooter };
