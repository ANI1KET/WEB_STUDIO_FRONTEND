"use client";

import * as React from "react";
import { Circle } from "lucide-react";
import { MenuItem } from "@mui/material";

import { cn } from "@/app/lib/utils";

interface DropdownMenuRadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children?:
    | React.ReactElement<DropdownMenuRadioItemProps>
    | React.ReactElement<DropdownMenuRadioItemProps>[];
}

const DropdownMenuRadioGroup: React.FC<DropdownMenuRadioGroupProps> = ({
  value,
  children,
  onValueChange,
}) => {
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === DropdownMenuRadioItem) {
      return React.cloneElement(
        child as React.ReactElement<DropdownMenuRadioItemProps>,
        {
          checked: child.props.value === value,
          onChange: () => onValueChange?.(child.props.value),
        }
      );
    }
    return child;
  });

  return <>{childrenWithProps}</>;
};
DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup";

interface DropdownMenuRadioItemProps {
  value: string;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: () => void;
  children?: React.ReactNode;
}

const DropdownMenuRadioItem = React.forwardRef<
  HTMLLIElement,
  DropdownMenuRadioItemProps
>(({ className, children, checked, onChange, disabled, ...props }, ref) => (
  <MenuItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    disabled={disabled}
    onClick={onChange}
    {...props}
  >
    <div className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      {checked && <Circle className="h-2 w-2 fill-current" />}
    </div>
    {children}
  </MenuItem>
));
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

export { DropdownMenuRadioGroup, DropdownMenuRadioItem };
