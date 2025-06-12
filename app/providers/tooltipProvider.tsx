import * as React from "react";
import { Tooltip as MuiTooltip } from "@mui/material";

import { cn } from "@/app/lib/utils";

interface TooltipProviderProps {
  delayDuration?: number;
  children?: React.ReactNode;
  skipDelayDuration?: number;
  disableHoverableContent?: boolean;
}

const TooltipProvider: React.FC<TooltipProviderProps> = ({ children }) => {
  return <>{children}</>;
};

interface TooltipProps {
  open?: boolean;
  defaultOpen?: boolean;
  delayDuration?: number;
  content: React.ReactNode;
  skipDelayDuration?: number;
  children: React.ReactElement;
  onOpenChange?: (open: boolean) => void;
}

const Tooltip: React.FC<TooltipProps> = ({
  open,
  content,
  children,
  defaultOpen,
  onOpenChange,
  skipDelayDuration,
  delayDuration = 700,
  ...props
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen || false);

  const handleOpen = () => {
    if (onOpenChange) onOpenChange(true);
    setIsOpen(true);
  };

  const handleClose = () => {
    if (onOpenChange) onOpenChange(false);
    setIsOpen(false);
  };

  return (
    <MuiTooltip
      {...props}
      title={content}
      onOpen={handleOpen}
      onClose={handleClose}
      enterDelay={delayDuration}
      leaveDelay={skipDelayDuration}
      open={open !== undefined ? open : isOpen}
    >
      {children}
    </MuiTooltip>
  );
};

interface TooltipTriggerProps {
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const TooltipTrigger: React.FC<TooltipTriggerProps> = ({ children }) => {
  return <>{children}</>;
};

interface TooltipContentProps {
  className?: string;
  sideOffset?: number;
  children?: React.ReactNode;
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
