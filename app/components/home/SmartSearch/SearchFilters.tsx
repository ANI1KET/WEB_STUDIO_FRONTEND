"use client";

import { memo } from "react";
import dynamic from "next/dynamic";
import { Permission } from "@prisma/client";

type FilterComponents =
  | "FilterHeader"
  | "RoomFilterComponent"
  | "PropertyFilterComponent";

const loadFilter = (component: FilterComponents) =>
  dynamic(() => import("./filters").then((mod) => mod[component]), {
    ssr: false,
  });
const FilterHeader = loadFilter("FilterHeader");
const RoomFilterComponent = loadFilter("RoomFilterComponent");
const PropertyFilterComponent = loadFilter("PropertyFilterComponent");

interface SearchFiltersProps {
  category: Permission | "";
  propertyTypeExist: boolean;
}

const SearchFilters = ({ category, propertyTypeExist }: SearchFiltersProps) => {
  if (!category) {
    return (
      <div className="bg-white p-1 mx-4 rounded-lg border border-gray-200 shadow-sm">
        <FilterHeader />
        <div className="text-center p-2 text-gray-500">
          Please select a category
        </div>
      </div>
    );
  }
  if (category === "property" && !propertyTypeExist) {
    return (
      <div className="bg-white p-1 mx-4 rounded-lg border border-gray-200 shadow-sm">
        <FilterHeader />
        <div className="text-center p-2 text-gray-500">
          Please select a property type
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-1 mx-4 rounded-lg border border-gray-200 shadow-sm">
      <FilterHeader />

      {category === "room" && <RoomFilterComponent />}

      {category === "property" && <PropertyFilterComponent />}
    </div>
  );
};

export default memo(SearchFilters);
// export default memo(SearchFilters, (prev, next) => (
//   prev.category === next.category &&
//   prev.propertyTypeExist === next.propertyTypeExist
// ));
