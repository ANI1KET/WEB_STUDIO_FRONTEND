"use client";

import {
  Radio,
  FormControl,
  FormControlLabel,
  RadioGroup as MuiRadioGroup,
  RadioGroupProps as MuiRadioGroupProps,
} from "@mui/material";
import React from "react";

import { cn } from "@/app/lib/utils";

interface RadioGroupProps extends Omit<MuiRadioGroupProps, "onChange"> {
  value?: string;
  onValueChange?: (value: string) => void;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, children, value, onValueChange, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onValueChange) onValueChange(event.target.value);
    };

    return (
      <FormControl ref={ref}>
        <MuiRadioGroup
          className={cn("grid gap-2", className)}
          value={value || ""}
          onChange={handleChange}
          {...props}
        >
          {children}
        </MuiRadioGroup>
      </FormControl>
    );
  }
);
RadioGroup.displayName = "RadioGroup";

interface RadioGroupItemProps {
  value: string;
  className?: string;
  id?: string;
  children?: React.ReactNode;
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, children, value, id, ...props }, ref) => {
    return (
      <FormControlLabel
        value={value}
        control={<Radio id={id} inputRef={ref} {...props} />}
        label={children}
        className={className}
      />
    );
  }
);
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
