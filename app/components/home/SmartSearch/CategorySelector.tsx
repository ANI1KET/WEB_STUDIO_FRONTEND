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
import { Permission } from "@prisma/client";

import { categoryOptions } from "./config/CategorySelector";
import { getCategoryIcon } from "./config/CategorySelectorIcon";

import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

type CategorySelectorProps = {
  category: Permission | "";
  onCategoryChange: (value: Permission) => void;
};

const CategorySelector = ({
  category,
  onCategoryChange,
}: CategorySelectorProps) => {
  const [searchTerm, setSearchTerm] = useState<Permission | "">("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCategorySelect = (value: Permission) => {
    onCategoryChange(value);
    handleClose();
  };

  return (
    <div className="relative">
      <Label htmlFor="category" className="text-sm font-medium text-gray-700">
        Category
      </Label>
      <Button
        variant="outline"
        className="w-full justify-between bg-background border border-green-200 hover:border-green-500"
        onClick={handleClick}
      >
        <span
          className={`${
            !category ? "text-muted-foreground" : ""
          } truncate flex items-center gap-2`}
        >
          {category ? (
            <>
              {getCategoryIcon(category)}
              {category}
            </>
          ) : (
            "Select category"
          )}
        </span>
        <Check
          className={`h-4 w-4 opacity-0 ${category ? "opacity-100" : ""}`}
        />
      </Button>

      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              // zIndex: 9999,
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
            Categories
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ p: 1 }}>
          <Input
            value={searchTerm}
            placeholder="Search categories..."
            onChange={(e) => setSearchTerm(e.target.value as Permission | "")}
          />
        </Box>
        <Divider />

        <Paper sx={{ maxHeight: 200, overflow: "auto" }}>
          <MenuList>
            {categoryOptions
              .filter((value) =>
                value.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((value) => (
                <MenuItem
                  key={value}
                  onClick={() => handleCategorySelect(value)}
                  sx={{
                    py: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span>{getCategoryIcon(value)}</span>
                    {value}
                  </div>
                  {category === value && (
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

export default CategorySelector;
