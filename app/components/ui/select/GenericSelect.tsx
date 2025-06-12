"use client";

import {
  MenuItem,
  Typography,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  Select as MuiSelect,
} from "@mui/material";
import * as React from "react";

interface GenericSelectProps<T extends string> {
  value: T;
  id?: string;
  options: T[];
  name?: string;
  label?: string;
  error?: boolean;
  multiple?: boolean;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  helperText?: string;
  fullWidth?: boolean;
  placeholder?: string;
  size?: "small" | "medium";
  onChange?: (value: T) => void;
  variant?: "outlined" | "standard" | "filled";
}

// Generic Select component
export function GenericSelect<T extends string>({
  id,
  name,
  value,
  label,
  error,
  onChange,
  disabled,
  className,
  helperText,
  options = [],
  size = "small",
  multiple = false,
  required = false,
  fullWidth = true,
  variant = "outlined",
  placeholder = "Select an option",
}: GenericSelectProps<T>) {
  const handleChange = (event: SelectChangeEvent) => {
    if (onChange) {
      onChange(event.target.value as T);
    }
  };

  return (
    <FormControl
      size={size}
      error={error}
      variant={variant}
      disabled={disabled}
      required={required}
      fullWidth={fullWidth}
      className={className}
    >
      {label && (
        <InputLabel id={id ? `${id}-label` : undefined}>{label}</InputLabel>
      )}
      <MuiSelect
        id={id}
        name={name}
        value={value}
        multiple={multiple}
        displayEmpty={!label}
        onChange={handleChange}
        label={label || placeholder}
        labelId={id ? `${id}-label` : undefined}
      >
        {!required && !multiple && (
          <MenuItem value="">
            <em>{placeholder}</em>
          </MenuItem>
        )}
        {options.length > 0 ? (
          options.map((option) => (
            <MenuItem
              key={option}
              value={option}
              sx={{
                gap: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="body2">{option}</Typography>
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled value="">
            No options available
          </MenuItem>
        )}
      </MuiSelect>
      {helperText && (
        <Typography
          sx={{ mt: 0.5 }}
          variant="caption"
          color={error ? "error" : "text.secondary"}
        >
          {helperText}
        </Typography>
      )}
    </FormControl>
  );
}
