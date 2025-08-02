"use client";

import React, { useMemo } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import { SortableField } from "@/app/types/sortableField";
import { ComparisonHeaderProps, SortingControlsProps } from "./types";

import { Button } from "@/app/components/ui/button";

const ComparisonHeader = ({
  rooms,
  sortBy,
  sortOrder,
  isExpanded,
  selectedCity,
  onCityChange,
  onSortChange,
  onToggleExpanded,
  onSortOrderChange,
}: ComparisonHeaderProps) => {
  const roomsCities = useMemo(() => {
    return [...new Set(rooms.map((room) => room.city))];
  }, [rooms]);
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
      <div className="flex flex-col w-full gap-2">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900">
          Quick Comparison
        </h3>

        {selectedCity && (
          <div className="text-sm text-gray-600">
            Filtering by city: <strong>{selectedCity}</strong>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
        <SortingControls
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
          onSortOrderChange={onSortOrderChange}
        />

        <FormControl
          size="small"
          sx={{ minWidth: 120, width: { xs: "100%", sm: "auto" } }}
        >
          <InputLabel>City</InputLabel>
          <Select
            value={selectedCity}
            label="City"
            onChange={(e) => onCityChange(e.target.value)}
          >
            <MenuItem value="">
              <em>All Cities</em>
            </MenuItem>
            {roomsCities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          size="sm"
          variant="outline"
          onClick={onToggleExpanded}
          className="text-green-600 border-green-200 flex-1 sm:flex-none"
        >
          {isExpanded ? (
            <Minimize2 className="w-4 h-4 mr-1" />
          ) : (
            <Maximize2 className="w-4 h-4 mr-1" />
          )}
          <span className="hidden sm:inline">
            {isExpanded ? "Show Less" : "Show More"}
          </span>
          <span className="sm:hidden">{isExpanded ? "Less" : "More"}</span>
        </Button>
      </div>
    </div>
  );
};

export default ComparisonHeader;

const SortingControls = ({
  sortBy,
  sortOrder,
  onSortChange,
  onSortOrderChange,
}: SortingControlsProps) => {
  const numericalFields: SortableField[] = [
    "hall",
    "price",
    // "ratings",
    "bedroom",
    "kitchen",
    "bathroom",
    "capacity",
  ];

  const isNumerical = numericalFields.includes(sortBy);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
      <FormControl
        size="small"
        sx={{ minWidth: 120, width: { xs: "100%", sm: "auto" } }}
      >
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortBy}
          label="Sort By"
          onChange={(e) => onSortChange(e.target.value as SortableField)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="capacity">Capacity</MenuItem>
          {/* <MenuItem value="ratings">Rating</MenuItem> */}
          <MenuItem value="bedroom">Bedrooms</MenuItem>
          <MenuItem value="hall">Halls</MenuItem>
          <MenuItem value="kitchen">Kitchens</MenuItem>
          <MenuItem value="bathroom">Bathrooms</MenuItem>

          <MenuItem value="city">City</MenuItem>
          {/* <MenuItem value="location">Location</MenuItem> */}
        </Select>
      </FormControl>

      {sortBy && (
        <FormControl
          size="small"
          sx={{ minWidth: 100, width: { xs: "100%", sm: "auto" } }}
        >
          <InputLabel>Order</InputLabel>
          <Select
            value={sortOrder}
            label="Order"
            onChange={(e) =>
              onSortOrderChange(e.target.value as "asc" | "desc")
            }
          >
            <MenuItem value="asc">
              {isNumerical ? "Low to High" : "A to Z"}
            </MenuItem>
            <MenuItem value="desc">
              {isNumerical ? "High to Low" : "Z to A"}
            </MenuItem>
          </Select>
        </FormControl>
      )}
    </div>
  );
};
