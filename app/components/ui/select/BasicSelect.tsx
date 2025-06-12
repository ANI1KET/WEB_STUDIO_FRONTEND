"use client";

import {
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  Select as MuiSelect,
} from "@mui/material";
import * as React from "react";

interface SelectProps {
  value?: string;
  options: string[];
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

// Basic Select component
export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      value,
      disabled,
      onChange,
      className,
      options = [],
      placeholder = "Select an option",
    },
    ref
  ) => {
    // Fix the event handler to match MUI's SelectChangeEvent type
    const handleChange = (event: SelectChangeEvent<string>) => {
      onChange?.(event.target.value);
    };

    return (
      <FormControl
        fullWidth
        variant="outlined"
        size="small"
        disabled={disabled}
        className={className}
        ref={ref}
      >
        <InputLabel>{placeholder}</InputLabel>
        <MuiSelect
          value={value || ""}
          onChange={handleChange}
          label={placeholder}
          displayEmpty
        >
          {options.length > 0 ? (
            options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled value="">
              No options available
            </MenuItem>
          )}
        </MuiSelect>
      </FormControl>
    );
  }
);

Select.displayName = "Select";
