"use client";

import {
  Paper,
  Popper,
  MenuList,
  MenuItem,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  InputAdornment,
  ClickAwayListener,
  Select as MuiSelect,
} from "@mui/material";
import * as React from "react";
import { Search, Check } from "@mui/icons-material";

import { cn } from "@/app/lib/utils";

// Generic Searchable Select component
interface GenericSearchableSelectProps {
  id?: string;
  name?: string;
  value?: string;
  label?: string;
  error?: boolean;
  options: string[];
  className?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  helperText?: string;
  placeholder?: string;
  emptyMessage?: string;
  size?: "small" | "medium";
  searchPlaceholder?: string;
  onChange?: (value: string) => void;
}

export function GenericSearchableSelect({
  id,
  name,
  value,
  label,
  error,
  onChange,
  disabled,
  className,
  helperText,
  size = "small",
  options = [],
  required = false,
  searchPlaceholder = "Search...",
  placeholder = "Select an option",
  emptyMessage = "No results found.",
}: GenericSearchableSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const anchorRef = React.useRef<HTMLDivElement>(null);

  // Filter options based on search term
  const filteredOptions = React.useMemo(() => {
    if (!searchTerm) return options;
    return options.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  // Find selected option
  const selectedOption = options.find((option) => option === value);

  const handleToggle = () => {
    if (!disabled) {
      setOpen((prevOpen) => !prevOpen);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setOpen(false);
    setSearchTerm("");
  };

  return (
    <div className={cn("relative w-full", className)} ref={anchorRef}>
      <FormControl
        fullWidth
        variant="outlined"
        size={size}
        disabled={disabled}
        error={error}
        required={required}
      >
        {label && (
          <InputLabel id={id ? `${id}-label` : undefined}>{label}</InputLabel>
        )}
        <MuiSelect
          labelId={id ? `${id}-label` : undefined}
          id={id}
          name={name}
          value={value ?? ""}
          onClick={handleToggle}
          label={label || placeholder}
          displayEmpty={!label}
          inputProps={{
            readOnly: true, // Prevents keyboard input
          }}
          // Disable the default menu
          MenuProps={{
            container: anchorRef.current,
            disablePortal: true,
            open: false, // Never open the default menu
          }}
        >
          <MenuItem value="">
            <em>{placeholder}</em>
          </MenuItem>
          {selectedOption && (
            <MenuItem value={selectedOption}>{selectedOption}</MenuItem>
          )}
        </MuiSelect>
        {helperText && (
          <Typography
            variant="caption"
            color={error ? "error" : "text.secondary"}
            sx={{ mt: 0.5 }}
          >
            {helperText}
          </Typography>
        )}
      </FormControl>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        style={{ width: anchorRef.current?.clientWidth, zIndex: 1300 }}
      >
        <Paper sx={{ maxHeight: 300, overflowY: "auto", mt: 1 }}>
          <ClickAwayListener onClickAway={handleClose}>
            <div>
              <TextField
                autoFocus
                fullWidth
                variant="standard"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search fontSize="small" />
                    </InputAdornment>
                  ),
                  disableUnderline: true,
                  sx: { px: 2, py: 1 },
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setOpen(false);
                }}
              />
              <MenuList>
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <MenuItem
                      key={option}
                      selected={option === value}
                      onClick={() => handleSelect(option)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      {option === value && <Check fontSize="small" />}
                      <div>
                        <Typography variant="body2">{option}</Typography>
                      </div>
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>
                    <Typography
                      variant="body2"
                      align="center"
                      sx={{ width: "100%", py: 1 }}
                    >
                      {emptyMessage}
                    </Typography>
                  </MenuItem>
                )}
              </MenuList>
            </div>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </div>
  );
}
