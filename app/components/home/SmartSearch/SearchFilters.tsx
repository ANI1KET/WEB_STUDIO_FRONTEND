"use client";

import { memo } from "react";
import dynamic from "next/dynamic";

type FilterComponents = "FilterHeader" | "RoomFilterComponent";
// | "PropertyFilterComponent";

const loadFilter = (component: FilterComponents) =>
  dynamic(() => import("./filters").then((mod) => mod[component]), {
    ssr: false,
  });
const FilterHeader = loadFilter("FilterHeader");
const RoomFilterComponent = loadFilter("RoomFilterComponent");
// const PropertyFilterComponent = loadFilter("PropertyFilterComponent");

interface SearchFiltersProps {
  category: string;
}

const SearchFilters = ({ category }: SearchFiltersProps) => {
  if (!category) {
    return (
      <div className="bg-white p-1 mx-2 rounded-lg border border-gray-200 shadow-sm">
        <FilterHeader />
        <div className="text-center p-2 text-gray-500">
          Please select a category
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white p-1 mx-2 rounded-lg border border-gray-200 shadow-sm">
      <FilterHeader />

      {category === "room" && <RoomFilterComponent />}

      {/* {category === "property" && <PropertyFilterComponent />} */}
    </div>
  );
};

export default memo(SearchFilters);
// export default memo(SearchFilters, (prev, next) => (
//   prev.category === next.category &&
//   prev.propertyTypeExist === next.propertyTypeExist
// ));
