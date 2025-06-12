"use client";

import {
  Box,
  Paper,
  Popper,
  TextField,
  Autocomplete,
  InputAdornment,
} from "@mui/material";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/app/lib/utils";

interface ComboboxProps<T extends string> {
  value?: T;
  options: T[];
  className?: string;
  placeholder?: string;
  emptyMessage?: string;
  allowCustom?: boolean;
  searchPlaceholder?: string;
  onValueChange?: (value: T | string) => void;
}

export function Combobox<T extends string>({
  value,
  options,
  className,
  onValueChange,
  allowCustom = false,
  placeholder = "Select option...",
  emptyMessage = "No option found.",
}: ComboboxProps<T>) {
  const [inputValue, setInputValue] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (
    _: React.SyntheticEvent,
    newValue: T | string | null
  ) => {
    if (newValue) {
      onValueChange?.(newValue);
    } else {
      onValueChange?.("");
    }
  };

  const handleInputChange = (
    _: React.SyntheticEvent,
    newInputValue: string
  ) => {
    setInputValue(newInputValue);
  };

  const filterOptions = (
    options: T[],
    { inputValue }: { inputValue: string }
  ) => {
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );

    if (
      allowCustom &&
      inputValue &&
      !options.find((opt) => opt.toLowerCase() === inputValue.toLowerCase())
    ) {
      return [...filtered, inputValue as T];
    }

    return filtered;
  };

  return (
    <Autocomplete
      open={open}
      options={options}
      value={value || null}
      freeSolo={allowCustom}
      onChange={handleChange}
      inputValue={inputValue}
      noOptionsText={emptyMessage}
      onOpen={() => setOpen(true)}
      filterOptions={filterOptions}
      onClose={() => setOpen(false)}
      onInputChange={handleInputChange}
      getOptionLabel={(option) => option}
      isOptionEqualToValue={(option, value) => option === value}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          variant="outlined"
          placeholder={placeholder}
          className={cn("w-full", className)}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <ChevronsUpDown className="h-4 w-4 opacity-50" />
                </InputAdornment>
              ),
              sx: {
                height: "36px",
                fontSize: "0.875rem",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#d1d5db",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#9ca3af",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3b82f6",
                  borderWidth: "1px",
                },
              },
            },
          }}
        />
      )}
      renderOption={(props, option) => {
        const { key, ...rest } = props;
        return (
          <Box
            component="li"
            key={key}
            {...rest}
            sx={{ fontSize: "0.875rem", py: 1 }}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                value === option ? "opacity-100" : "opacity-0"
              )}
            />
            {option}
          </Box>
        );
      }}
      slots={{
        paper: (props) => (
          <Paper
            {...props}
            sx={{
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              border: "1px solid #e5e7eb",
              mt: 1,
            }}
          >
            {props.children}
          </Paper>
        ),
        popper: (props) => {
          const anchorEl = props.anchorEl;
          const width =
            anchorEl &&
            typeof anchorEl === "object" &&
            "clientWidth" in anchorEl
              ? anchorEl.clientWidth
              : "auto";

          return (
            <Popper
              {...props}
              style={{ width, minWidth: width }}
              placement="bottom-start"
            />
          );
        },
      }}
    />
  );
}
