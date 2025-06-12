"use client";

import * as React from "react";
import {
  ToggleButton,
  ToggleButtonProps,
  ToggleButtonGroup as MuiToggleGroup,
  ToggleButtonGroupProps as MuiToggleGroupProps,
} from "@mui/material";

import { cn } from "@/app/lib/utils";

type ToggleGroupContextValue = {
  value: string | string[];
  type: "single" | "multiple";
  onValueChange: (value: string) => void;
};

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  value: "",
  type: "single",
  onValueChange: () => {},
});

interface ToggleGroupProps
  extends Omit<
    MuiToggleGroupProps,
    "onChange" | "value" | "className" | "size"
  > {
  className?: string;
  value: string | string[];
  type: "single" | "multiple";
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline";
  onValueChange: (value: string) => void;
}

const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  (
    {
      type,
      value,
      className,
      onValueChange,
      size = "default",
      variant = "default",
      ...props
    },
    ref
  ) => {
    const handleChange = (
      _: React.MouseEvent<HTMLElement>,
      newValue: string
    ) => {
      onValueChange(newValue);
    };

    // Map our custom size values to MUI sizes
    let muiSize: "small" | "medium" | "large";
    switch (size) {
      case "sm":
        muiSize = "small";
        break;
      case "lg":
        muiSize = "large";
        break;
      default:
        muiSize = "medium";
    }

    return (
      <ToggleGroupContext.Provider value={{ type, value, onValueChange }}>
        <MuiToggleGroup
          ref={ref}
          value={value}
          size={muiSize}
          onChange={handleChange}
          exclusive={type === "single"}
          className={cn(
            "inline-flex items-center justify-center gap-1",
            {
              "rounded-md bg-muted p-1": variant === "default",
              "border border-input": variant === "outline",
            },
            className
          )}
          {...props}
        />
      </ToggleGroupContext.Provider>
    );
  }
);
ToggleGroup.displayName = "ToggleGroup";

interface ToggleGroupItemProps
  extends Omit<ToggleButtonProps, "value" | "className" | "size"> {
  value: string;
  className?: string;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline";
}

const ToggleGroupItem = React.forwardRef<
  HTMLButtonElement,
  ToggleGroupItemProps
>(({ className, value, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  if (!context) {
    throw new Error("ToggleGroupItem must be used within a ToggleGroup");
  }

  const isSelected =
    context.type === "single"
      ? context.value === value
      : Array.isArray(context.value) && context.value.includes(value);

  // Map our custom size values to MUI sizes
  let muiSize: "small" | "medium" | "large";
  switch (size) {
    case "sm":
      muiSize = "small";
      break;
    case "lg":
      muiSize = "large";
      break;
    default:
      muiSize = "medium";
  }

  return (
    <ToggleButton
      ref={ref}
      value={value}
      size={muiSize}
      selected={isSelected}
      className={cn(
        "data-[state=on]:bg-background data-[state=on]:text-foreground",
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-transparent hover:bg-muted hover:text-muted-foreground":
            variant === "default",
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground":
            variant === "outline",
          "h-9 px-3": size === "default",
          "h-8 px-2": size === "sm",
          "h-10 px-4": size === "lg",
        },
        className
      )}
      {...props}
    />
  );
});
ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };
