"use cleint";

import React from "react";

import { Separator } from "@/app/components/ui/separator";

interface FilterHeaderProps {
  title?: string;
}

const FilterHeader: React.FC<FilterHeaderProps> = ({
  title = "Advanced Filters",
}) => {
  return (
    <>
      <h3 className="font-semibold text-lg p-2 text-gray-800">{title}</h3>
      <Separator />
    </>
  );
};

export default FilterHeader;
