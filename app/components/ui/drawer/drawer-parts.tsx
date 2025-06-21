"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { Box, IconButton, IconButtonProps } from "@mui/material";

import { cn } from "@/app/lib/utils";

interface DrawerTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const DrawerTrigger = React.forwardRef<HTMLButtonElement, DrawerTriggerProps>(
  ({ children, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp ref={ref} {...props}>
        {children}
      </Comp>
    );
  }
);
DrawerTrigger.displayName = "DrawerTrigger";

interface DrawerPortalProps {
  children?: React.ReactNode;
}

const DrawerPortal = React.forwardRef<HTMLDivElement, DrawerPortalProps>(
  ({ children }, ref) => <div ref={ref}>{children}</div>
);
DrawerPortal.displayName = "DrawerPortal";

interface DrawerOverlayProps {
  className?: string;
}

const DrawerOverlay = React.forwardRef<HTMLDivElement, DrawerOverlayProps>(
  ({ className, ...props }, ref) => (
    <Box
      ref={ref}
      className={cn("fixed inset-0 z-50 bg-black/80", className)}
      {...props}
    />
  )
);
DrawerOverlay.displayName = "DrawerOverlay";

interface DrawerContentProps {
  className?: string;
  children?: React.ReactNode;
}

const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ className, children, ...props }, ref) => (
    <Box
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className
      )}
      {...props}
    >
      <div className="mx-auto h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </Box>
  )
);
DrawerContent.displayName = "DrawerContent";

interface DrawerCloseProps extends Omit<IconButtonProps, "color"> {
  className?: string;
}

const DrawerClose = React.forwardRef<HTMLButtonElement, DrawerCloseProps>(
  ({ className, ...props }, ref) => (
    <IconButton
      ref={ref}
      aria-label="Close"
      component="button"
      className={cn(
        "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none",
        className
      )}
      {...props}
    >
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </IconButton>
  )
);
DrawerClose.displayName = "DrawerClose";

export {
  DrawerClose,
  DrawerPortal,
  DrawerTrigger,
  DrawerOverlay,
  DrawerContent,
};
