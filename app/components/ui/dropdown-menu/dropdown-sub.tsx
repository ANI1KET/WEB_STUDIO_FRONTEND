"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { MenuItem, Box } from "@mui/material";

import { cn } from "@/app/lib/utils";

interface DropdownMenuSubProps {
  children?: React.ReactNode;
}

const DropdownMenuSub: React.FC<DropdownMenuSubProps> = ({ children }) => {
  return <>{children}</>;
};
DropdownMenuSub.displayName = "DropdownMenuSub";

interface DropdownMenuSubTriggerProps
  extends React.ComponentProps<typeof MenuItem> {
  inset?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const DropdownMenuSubTrigger = React.forwardRef<
  HTMLLIElement,
  DropdownMenuSubTriggerProps
>(({ className, inset, children, ...props }, ref) => (
  <MenuItem
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenuItem>
));
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

interface DropdownMenuSubContentProps {
  className?: string;
  children?: React.ReactNode;
}

const DropdownMenuSubContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuSubContentProps
>(({ className, children, ...props }, ref) => (
  <Box
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  >
    {children}
  </Box>
));
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";

export { DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent };
