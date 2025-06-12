"use client";

import {
  Popper,
  Paper,
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

// Searchable Select component
interface SearchableSelectProps {
  value?: string;
  options: string[];
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  emptyMessage?: string;
  onChange?: (value: string) => void;
}

export const SearchableSelect = React.forwardRef<
  HTMLDivElement,
  SearchableSelectProps
>(
  (
    {
      value,
      onChange,
      disabled,
      className,
      options = [],
      placeholder = "Search...",
      emptyMessage = "No results found.",
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const [searchTerm, setSearchTerm] = React.useState("");

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

    // Custom handler for ClickAwayListener
    const handleClickAway = (event: MouseEvent | TouchEvent) => {
      // Check if the element is part of our component
      if (
        anchorRef.current &&
        anchorRef.current.contains(event.target as Node)
      ) {
        return;
      }
      handleClose();
    };

    return (
      <div
        className={cn("relative w-full", className)}
        ref={(node) => {
          // Forward ref
          if (ref) {
            if (typeof ref === "function") {
              ref(node);
            } else {
              ref.current = node;
            }
          }
          if (anchorRef.current !== node) {
            anchorRef.current = node || null;
          }
        }}
      >
        <FormControl
          fullWidth
          variant="outlined"
          size="small"
          disabled={disabled}
        >
          <InputLabel>{placeholder}</InputLabel>
          <MuiSelect
            value={value || ""}
            onClick={handleToggle}
            label={placeholder}
            displayEmpty
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
        </FormControl>

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom-start"
          style={{ width: anchorRef.current?.clientWidth, zIndex: 1300 }}
        >
          <Paper sx={{ maxHeight: 300, overflowY: "auto", mt: 1 }}>
            <ClickAwayListener onClickAway={handleClickAway}>
              <div>
                <TextField
                  autoFocus
                  fullWidth
                  variant="standard"
                  placeholder="Search..."
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
                        <Typography variant="body2">{option}</Typography>
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
);

SearchableSelect.displayName = "SearchableSelect";
