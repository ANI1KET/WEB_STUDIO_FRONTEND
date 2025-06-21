"use client";

import {
  Drawer as MuiDrawer,
  DrawerProps as MuiDrawerProps,
} from "@mui/material";
import * as React from "react";

interface DrawerProps extends Omit<MuiDrawerProps, "open" | "onClose"> {
  open?: boolean;
  children?: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}

const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  ({ open, children, onOpenChange, anchor = "bottom", ...props }, ref) => {
    const handleClose = () => {
      if (onOpenChange) onOpenChange(false);
    };

    return (
      <MuiDrawer
        ref={ref}
        open={!!open}
        anchor={anchor}
        onClose={handleClose}
        {...props}
      >
        {children}
      </MuiDrawer>
    );
  }
);
Drawer.displayName = "Drawer";

export { Drawer };
