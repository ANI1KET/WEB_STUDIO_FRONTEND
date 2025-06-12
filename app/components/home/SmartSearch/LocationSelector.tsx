"use client";

import {
  Box,
  Chip,
  Menu,
  Paper,
  Divider,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { Check } from "lucide-react";
import React, { useState } from "react";

import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

interface LocationSelectorProps {
  disabled: boolean;
  className?: string;
  selectedCity: string;
  selectedLocations: string[];
  availableLocations: string[];
  toggleLocation: (location: string) => void;
}

const LocationSelector = ({
  disabled,
  className,
  selectedCity,
  toggleLocation,
  selectedLocations,
  availableLocations,
}: LocationSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled || !selectedCity) return;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLocationSelect = (location: string) => {
    toggleLocation(location);
  };

  const filteredLocations = availableLocations.filter((location) =>
    location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={className}>
      <Label htmlFor="locations" className="text-sm font-medium">
        Locations
      </Label>
      <Button
        variant="outline"
        onClick={handleClick}
        disabled={disabled || !selectedCity}
        className={`w-full mt-2 justify-between bg-background border border-green-200 hover:border-green-500 text-left ${
          disabled ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        <div className="flex flex-wrap gap-1.5 py-0.5 max-w-[90%] overflow-hidden">
          {selectedLocations.length > 0 ? (
            selectedLocations.map((location) => (
              <span
                key={location}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
              >
                {location}
              </span>
            ))
          ) : (
            <span className="text-muted-foreground truncate">
              {disabled
                ? "Select category and city first"
                : selectedCity
                ? "Select locations (optional)"
                : "Select city first"}
            </span>
          )}
        </div>
        <Check
          className={`h-4 w-4 opacity-0 ml-2 ${
            selectedLocations.length > 0 ? "opacity-100" : ""
          }`}
        />
      </Button>

      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              width: anchorEl ? anchorEl.clientWidth : undefined,
              maxHeight: 300,
              backgroundColor: "white",
            },
            className: "rounded-md shadow-lg",
            sx: {
              "& .MuiList-root": {
                padding: 0,
              },
              "&::-webkit-scrollbar": {
                width: "4px",
                height: "4px",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#10b981",
                borderRadius: "20px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#059669",
              },
            },
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" fontWeight="bold">
            Locations in {selectedCity}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ px: 2, py: 1 }}>
          <Input
            placeholder="Search locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-2"
          />
        </Box>

        <Divider />

        <Paper
          sx={{
            maxHeight: 200,
            overflow: "auto",
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#10b981",
              borderRadius: "20px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#059669",
            },
          }}
        >
          <MenuList>
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location) => (
                <MenuItem
                  key={location}
                  onClick={() => handleLocationSelect(location)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    py: 1,
                  }}
                >
                  {location}
                  {selectedLocations.includes(location) && (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No locations found</MenuItem>
            )}
          </MenuList>
        </Paper>

        {selectedLocations.length > 0 && (
          <Box>
            <Divider />
            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle2" fontWeight="bold" mb={1}>
                Selected Locations:
              </Typography>
              <div className="flex flex-wrap gap-1">
                {selectedLocations.map((loc) => (
                  <Chip
                    key={loc}
                    label={loc}
                    size="small"
                    color="success"
                    onDelete={() => toggleLocation(loc)}
                  />
                ))}
              </div>
            </Box>
          </Box>
        )}
      </Menu>
    </div>
  );
};

export default LocationSelector;
