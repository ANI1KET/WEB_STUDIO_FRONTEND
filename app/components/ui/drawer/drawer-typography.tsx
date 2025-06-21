"use client";

import * as React from "react";

import { cn } from "@/app/lib/utils";

interface DrawerTitleProps {
  className?: string;
  children?: React.ReactNode;
}

const DrawerTitle = React.forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  )
);
DrawerTitle.displayName = "DrawerTitle";

interface DrawerDescriptionProps {
  className?: string;
  children?: React.ReactNode;
}

const DrawerDescription = React.forwardRef<
  HTMLParagraphElement,
  DrawerDescriptionProps
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  >
    {children}
  </p>
));
DrawerDescription.displayName = "DrawerDescription";

export { DrawerTitle, DrawerDescription };
