"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/app/lib/utils";

import {
  IconButton,
  DialogActions,
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
  DialogContent as MuiDialogContent,
} from "@mui/material";

interface DialogTriggerProps {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button ref={ref} type="button" className={className} {...props}>
        {children}
      </button>
    );
  }
);
DialogTrigger.displayName = "DialogTrigger";

interface DialogPortalProps {
  children?: React.ReactNode;
}

const DialogPortal: React.FC<DialogPortalProps> = ({ children }) => {
  return <>{children}</>;
};
DialogPortal.displayName = "DialogPortal";

interface DialogContentProps extends Omit<MuiDialogProps, "onClose"> {
  className?: string;
  onClose?: () => void;
  children?: React.ReactNode;
}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, onClose, ...props }, ref) => {
    const childArray = React.Children.toArray(children);

    const headerChild = childArray.find(
      (child) => React.isValidElement(child) && child.type === DialogHeader
    );

    const footerChild = childArray.find(
      (child) => React.isValidElement(child) && child.type === DialogFooter
    );

    const contentChildren = childArray.filter(
      (child) =>
        React.isValidElement(child) &&
        child.type !== DialogHeader &&
        child.type !== DialogFooter
    );

    return (
      <MuiDialog
        ref={ref}
        onClose={() => onClose?.()}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            className: cn(
              "relative w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border-0 overflow-hidden",
              className
            ),
            style: {
              margin: "16px",
              maxHeight: "calc(100vh - 32px)",
              borderRadius: "16px",
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)",
            },
          },
          backdrop: {
            style: {
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              backdropFilter: "blur(8px)",
            },
          },
        }}
        {...props}
      >
        {/* Close Button */}
        <IconButton
          aria-label="close"
          onClick={() => onClose?.()}
          sx={{
            top: 16,
            right: 16,
            width: 40,
            height: 40,
            zIndex: 10,
            color: "#6B7280",
            position: "absolute",
            transition: "all 0.2s ease-in-out",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              color: "#374151",
              transform: "scale(1.05)",
              backgroundColor: "rgba(255, 255, 255, 1)",
            },
          }}
        >
          <X className="h-5 w-5" />
        </IconButton>

        {headerChild}

        <MuiDialogContent
          sx={{
            padding: "24px",
            paddingTop: headerChild ? "8px" : "24px",
            paddingBottom: footerChild ? "8px" : "24px",
          }}
        >
          {contentChildren}
        </MuiDialogContent>

        {footerChild}
      </MuiDialog>
    );
  }
);
DialogContent.displayName = "DialogContent";

const DialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-6 pt-8 pb-4 border-b border-gray-100", className)}
    {...props}
  />
));
DialogHeader.displayName = "DialogHeader";

const DialogFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <DialogActions
    ref={ref}
    className={cn(
      "px-6 py-4 border-t border-gray-100 bg-gray-50/50",
      className
    )}
    sx={{
      gap: "12px",
      justifyContent: "flex-end",
    }}
    {...props}
  />
));
DialogFooter.displayName = "DialogFooter";

export {
  DialogHeader,
  DialogFooter,
  DialogPortal,
  DialogTrigger,
  DialogContent,
};
