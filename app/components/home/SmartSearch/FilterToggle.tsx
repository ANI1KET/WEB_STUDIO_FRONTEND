"use client";

import React from "react";
import { Filter } from "lucide-react";

import { Button } from "@/app/components/ui/button";

interface FilterToggleProps {
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
}

const FilterToggle: React.FC<FilterToggleProps> = ({
  showFilters,
  setShowFilters,
}) => {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => setShowFilters(!showFilters)}
      className="flex items-center text-sm text-gray-600 hover:text-gray-900"
    >
      <Filter className="h-4 w-4 mr-2" />
      Optional Filters
      <svg
        viewBox="0 0 24 24"
        className={`ml-2 h-4 w-4 transition-transform ${
          showFilters ? "rotate-180" : ""
        }`}
      >
        <path
          fill="none"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Button>
  );
};

export default FilterToggle;
