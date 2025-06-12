"use client";

import {
  Box,
  Menu,
  Paper,
  Divider,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { Check } from "lucide-react";
import React, { useState } from "react";

import { PropertyType } from "@/app/types/types";

import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

type PropertyTypeSelectorProps = {
  propertyType: string;
  propertyTypeOptions: PropertyType[];
  setPropertyType: (value: PropertyType) => void;
};

const PropertyTypeSelector = ({
  propertyType,
  setPropertyType,
  propertyTypeOptions,
}: PropertyTypeSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePropertyTypeSelect = (type: PropertyType) => {
    setPropertyType(type);
    handleClose();
  };

  return (
    <div>
      <Label htmlFor="propertyType" className="text-sm font-medium">
        Property Type
      </Label>
      <Button
        variant="outline"
        className="w-full mt-2 justify-between bg-background border border-green-200 hover:border-green-500"
        onClick={handleClick}
      >
        <span
          className={`${!propertyType ? "text-muted-foreground" : ""} truncate`}
        >
          {propertyType ? propertyType : "Select property type"}
        </span>
        <Check
          className={`h-4 w-4 opacity-0 ml-2 ${
            propertyType ? "opacity-100" : ""
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
              maxHeight: 300,
              backgroundColor: "white",
              width: anchorEl ? anchorEl.clientWidth : undefined,
            },
            className: "rounded-md shadow-lg",
          },
        }}
      >
        <Box sx={{ p: 1 }}>
          <Typography variant="subtitle2" fontWeight="bold">
            Property Types
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ p: 1 }}>
          <Input
            placeholder="Search property types..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-2"
          />
        </Box>

        <Divider />

        <Paper sx={{ maxHeight: 200, overflow: "auto" }}>
          <MenuList>
            {propertyTypeOptions
              .filter((value) =>
                value.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((value) => (
                <MenuItem
                  key={value}
                  onClick={() => handlePropertyTypeSelect(value)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    py: 1,
                  }}
                >
                  {value}
                  {propertyType === value && (
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

export default PropertyTypeSelector;
