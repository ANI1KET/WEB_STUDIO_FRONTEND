"use client";

import {
  Box,
  Menu,
  Paper,
  Divider,
  MenuList,
  MenuItem,
  Typography,
} from "@mui/material";
import { Check } from "lucide-react";
import React, { useState } from "react";

import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

interface CitySelectorProps {
  selectedCity: string;
  selectedCategory: string;
  availableCities: string[];
  handleCityChange: (value: string) => void;
}

const CitySelector = ({
  selectedCity,
  availableCities,
  selectedCategory,
  handleCityChange,
}: CitySelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!selectedCategory) return;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCitySelect = (city: string) => {
    handleCityChange(city);
    handleClose();
  };

  return (
    <div>
      <Label htmlFor="city" className="text-sm font-medium text-gray-700">
        City
      </Label>
      <Button
        variant="outline"
        onClick={handleClick}
        disabled={!selectedCategory}
        className={`w-full mt-2 justify-between bg-background border border-green-200 hover:border-green-500 ${
          !selectedCategory ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        <span
          className={`${
            !selectedCity ? "text-muted-foreground" : ""
          } truncate flex items-center gap-2`}
        >
          {selectedCity ? (
            <>{selectedCity}</>
          ) : selectedCategory ? (
            "Select a city"
          ) : (
            "Select category first"
          )}
        </span>
        <Check
          className={`h-4 w-4 opacity-0 ml-2 ${
            selectedCity ? "opacity-100" : ""
          }`}
        />
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            className: "rounded-md shadow-lg",
            style: {
              // zIndex: 9999,
              maxHeight: 300,
              backgroundColor: "white",
              width: anchorEl ? anchorEl.clientWidth : undefined,
            },
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
        <Box sx={{ p: 1 }}>
          <Typography variant="subtitle2" fontWeight="bold">
            Cities
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ p: 1 }}>
          <Input
            value={searchTerm}
            placeholder="Search cities..."
            onChange={(e) => setSearchTerm(e.target.value)}
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
            {availableCities
              .filter((value) =>
                value.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((value) => (
                <MenuItem
                  key={value}
                  onClick={() => handleCitySelect(value)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    py: 1,
                  }}
                >
                  <div className="flex items-center gap-2">{value}</div>
                  {selectedCity === value && (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                </MenuItem>
              ))}
          </MenuList>
        </Paper>
      </Menu>
    </div>
  );
};

export default CitySelector;
