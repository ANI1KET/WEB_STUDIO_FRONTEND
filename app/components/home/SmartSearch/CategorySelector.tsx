"use client";

import {
  Box,
  Menu,
  Divider,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { Check } from "lucide-react";
import React, { useState } from "react";

import { groupedCategoryOptions } from "./config/CategorySelector";
import { getCategoryIcon } from "@/app/common/icon/CategorySelector";

import { Category } from "../../../common/config/SmartSearch";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

type CategorySelectorProps = {
  category: string;
  onCategoryChange: (value: Category) => void;
};

const CategorySelector = ({
  category,
  onCategoryChange,
}: CategorySelectorProps) => {
  const [searchTerm, setSearchTerm] = useState<Category | "">("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCategorySelect = (value: Category) => {
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
        onClick={handleClick}
        className="w-full justify-between bg-background border border-green-200 hover:border-green-500"
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
              maxHeight: 300,
              backgroundColor: "white",
              width: anchorEl ? anchorEl.clientWidth : undefined,
            },
          },
        }}
      >
        <Box sx={{ p: 1 }}>
          <Input
            value={searchTerm}
            placeholder="Search categories..."
            onChange={(e) => setSearchTerm(e.target.value as Category | "")}
          />
        </Box>

        <Divider />

        <Box sx={{ maxHeight: 200, overflow: "auto" }}>
          <MenuList>
            {Object.entries(groupedCategoryOptions).map(
              ([groupKey, group], index, arr) => {
                const filteredOptions = group.filter((option) =>
                  option.toLowerCase().includes(searchTerm.toLowerCase())
                );

                if (filteredOptions.length === 0) return null;

                return (
                  <div key={groupKey}>
                    <div className="flex items-center gap-2 px-2">
                      <Typography
                        fontWeight="bold"
                        variant="subtitle2"
                        sx={{ color: "success.main" }}
                      >
                        {groupKey}
                      </Typography>
                    </div>

                    {filteredOptions.map((option) => (
                      <MenuItem
                        key={option}
                        sx={{
                          py: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                        onClick={() => handleCategorySelect(option)}
                      >
                        <div className="flex items-center gap-2">
                          <span>{getCategoryIcon(option)}</span>
                          {option}
                        </div>

                        {category === option && (
                          <Check className="h-4 w-4 text-green-500" />
                        )}
                      </MenuItem>
                    ))}
                    {index < arr.length - 1 && <Divider />}
                  </div>
                );
              }
            )}
          </MenuList>
        </Box>
      </Menu>
    </div>
  );
};

export default CategorySelector;
