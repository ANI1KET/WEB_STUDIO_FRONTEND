"use client";

import * as React from "react";
import { Menu, MenuItem, MenuItemProps } from "@mui/material";

import { cn } from "@/app/lib/utils";

interface DropdownMenuItemProps extends Omit<MenuItemProps, "className"> {
  inset?: boolean;
  asChild?: boolean;
  className?: string;
}

const DropdownMenuItem = React.forwardRef<
  HTMLLIElement,
  DropdownMenuItemProps & { children?: React.ReactNode }
>(({ className, inset, children, asChild = false, ...props }, ref) => {
  if (asChild && React.isValidElement(children)) {
    // Only forward specific props when using asChild
    const forwardProps = {
      onClick: props.onClick,
    };

    return React.cloneElement(children, {
      ...forwardProps,
    });
  }

  return (
    <MenuItem
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors",
        inset && "pl-8",
        className
      )}
      sx={{
        "&:focus": {
          backgroundColor: "rgba(0, 128, 0, 0.05)",
          outline: "none",
        },
        "&:hover": {
          backgroundColor: "rgba(0, 128, 0, 0.05)",
        },
      }}
      {...props}
    >
      {children}
    </MenuItem>
  );
});
DropdownMenuItem.displayName = "DropdownMenuItem";

interface DropdownMenuTriggerProps {
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuTriggerProps
>(({ className, children, asChild, ...props }, ref) => {
  // If asChild is true and children is a valid element, clone it
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>;

    // When using asChild, create a new element with merged props
    const childProps = {
      ...child.props,
      className: cn(child.props.className, className),
      ...props,
    };

    // Don't pass ref directly in the cloneElement
    return React.cloneElement(children, childProps);
  }

  return (
    <span className="inline-block">
      <button
        ref={ref}
        type="button"
        className={cn("inline-flex items-center justify-center", className)}
        aria-haspopup="true"
        {...props}
      >
        {children}
      </button>
    </span>
  );
});
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

interface DropdownMenuContentProps {
  open?: boolean;
  className?: string;
  sideOffset?: number;
  onClose?: () => void;
  children?: React.ReactNode;
  anchorEl?: HTMLElement | null;
  align?: "center" | "start" | "end";
}

function isFragmentElement(
  element: React.ReactNode
): element is React.ReactElement<{ children?: React.ReactNode }> {
  return React.isValidElement(element) && element.type === React.Fragment;
}

function unwrapChildren(children: React.ReactNode): React.ReactNode[] {
  const unwrapped: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (isFragmentElement(child)) {
      unwrapped.push(...unwrapChildren(child.props.children));
    } else {
      unwrapped.push(child);
    }
  });

  return unwrapped;
}

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(
  (
    {
      open,
      onClose,
      children,
      anchorEl,
      className,
      sideOffset = 4,
      align = "center",
      ...props
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref
  ) => {
    const flattenedChildren = unwrapChildren(children);

    // Set anchor and transform origins based on align prop
    const anchorOrigin = {
      vertical: "bottom" as const,
      horizontal:
        align === "center"
          ? ("center" as const)
          : align === "end"
          ? ("right" as const)
          : ("left" as const),
    };

    const transformOrigin = {
      vertical: "top" as const,
      horizontal:
        align === "center"
          ? ("center" as const)
          : align === "end"
          ? ("right" as const)
          : ("left" as const),
    };

    return (
      <Menu
        anchorEl={anchorEl}
        open={!!open}
        onClose={onClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        transitionDuration={200}
        slotProps={{
          paper: {
            className: cn(
              "min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
              className
            ),
            sx: {
              mt: sideOffset,
              "&:focus": {
                outline: "none",
              },
            },
          },
          list: {
            dense: true,
            "aria-orientation": "vertical",
          },
        }}
        {...props}
      >
        {flattenedChildren}
      </Menu>
    );
  }
);
DropdownMenuContent.displayName = "DropdownMenuContent";

interface DropdownMenuPortalProps {
  children?: React.ReactNode;
}

const DropdownMenuPortal: React.FC<DropdownMenuPortalProps> = ({
  children,
}) => {
  return <>{children}</>;
};
DropdownMenuPortal.displayName = "DropdownMenuPortal";

interface DropdownMenuGroupProps {
  className?: string;
  children?: React.ReactNode;
}

const DropdownMenuGroup: React.FC<DropdownMenuGroupProps> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn("px-1 py-1", className)} role="group" {...props}>
    {children}
  </div>
);
DropdownMenuGroup.displayName = "DropdownMenuGroup";

export {
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
};
