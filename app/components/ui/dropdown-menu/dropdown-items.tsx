"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { MenuItem, Divider, Box, Typography } from "@mui/material";

import { cn } from "@/app/lib/utils";

interface DropdownMenuItemProps
  extends Omit<React.ComponentProps<typeof MenuItem>, "inset"> {
  inset?: boolean;
}

const DropdownMenuItem = React.forwardRef<HTMLLIElement, DropdownMenuItemProps>(
  ({ className, inset, children, onClick, ...props }, ref) => (
    <MenuItem
      ref={ref}
      onClick={onClick}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
    </MenuItem>
  )
);
DropdownMenuItem.displayName = "DropdownMenuItem";

interface DropdownMenuCheckboxItemProps {
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
}

const DropdownMenuCheckboxItem = React.forwardRef<
  HTMLLIElement,
  DropdownMenuCheckboxItemProps
>(
  (
    { className, children, checked, onCheckedChange, disabled, ...props },
    ref
  ) => (
    <MenuItem
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      {...props}
    >
      <Box className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {checked && <Check className="h-4 w-4" />}
      </Box>
      {children}
    </MenuItem>
  )
);
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

interface DropdownMenuLabelProps {
  inset?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const DropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  DropdownMenuLabelProps
>(({ className, inset, children, ...props }, ref) => (
  <Box
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
  </Box>
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

interface DropdownMenuSeparatorProps {
  className?: string;
}

const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  DropdownMenuSeparatorProps
>(({ className, ...props }, ref) => (
  <Divider
    ref={ref as React.Ref<HTMLHRElement>}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

interface DropdownMenuShortcutProps {
  className?: string;
  children?: React.ReactNode;
}

const DropdownMenuShortcut = ({
  className,
  children,
  ...props
}: DropdownMenuShortcutProps) => {
  return (
    <Typography
      component="span"
      variant="caption"
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    >
      {children}
    </Typography>
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
};
