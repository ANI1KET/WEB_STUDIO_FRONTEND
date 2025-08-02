"use client";

import React, { useState, useMemo } from "react";

import { RoomData } from "@/app/types/types";
import { SortableField } from "@/app/types/sortableField";

import ComparisonTable from "./QuickComparisonTable/ComparisonTable";
import ComparisonHeader from "./QuickComparisonTable/ComparisonHeader";
import { comparisonFields } from "./config/QuickComparisonTable";

interface QuickComparisonTableProps {
  rooms: RoomData[];
}

const QuickComparisonTable = ({ rooms }: QuickComparisonTableProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortBy, setSortBy] = useState<SortableField>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredRoomsByCity = useMemo(() => {
    if (!selectedCity) return rooms;
    return rooms.filter(
      (room) => room.city.toLowerCase() === selectedCity.toLowerCase()
    );
  }, [rooms, selectedCity]);
  const sortedRooms = useMemo(() => {
    if (!sortBy) return filteredRoomsByCity;

    return [...filteredRoomsByCity].sort((a, b) => {
      let aValue: string | number = "";
      let bValue: string | number = "";

      switch (sortBy) {
        case "price":
          aValue = a.price;
          bValue = b.price;
          break;
        case "hall":
          aValue = a.hall;
          bValue = b.hall;
          break;
        // case "ratings":
        //   aValue = a.ratings;
        //   bValue = b.ratings;
        //   break;
        case "bedroom":
          aValue = a.bedroom;
          bValue = b.bedroom;
          break;
        case "kitchen":
          aValue = a.kitchen;
          bValue = b.kitchen;
          break;
        case "bathroom":
          aValue = a.bathroom;
          bValue = b.bathroom;
          break;
        case "capacity":
          aValue = a.maxCapacity;
          bValue = b.maxCapacity;
          break;
        case "city":
          aValue = a.city.toLowerCase();
          bValue = b.city.toLowerCase();
          break;
        // case "location":
        //   aValue = a.location.toLowerCase();
        //   bValue = b.location.toLowerCase();
        //   break;
        default:
          return 0;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortOrder === "asc"
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });
  }, [filteredRoomsByCity, sortBy, sortOrder]);

  const handleCityChange = (value: string) => setSelectedCity(value);
  const handleSortChange = (value: SortableField) => setSortBy(value);
  const handleSortOrderChange = (value: "asc" | "desc") => setSortOrder(value);

  const basicFields = comparisonFields.slice(0, 6);
  const fieldsToShow = isExpanded ? comparisonFields : basicFields;

  if (rooms.length <= 1) return null;

  return (
    <div className="bg-white p-3 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
      <ComparisonHeader
        rooms={rooms}
        sortBy={sortBy}
        sortOrder={sortOrder}
        isExpanded={isExpanded}
        selectedCity={selectedCity}
        onCityChange={handleCityChange}
        onSortChange={handleSortChange}
        onSortOrderChange={handleSortOrderChange}
        onToggleExpanded={() => setIsExpanded(!isExpanded)}
      />

      {sortBy && (
        <div className="mb-4 text-sm text-gray-600">
          Sorted by {sortBy} ({sortOrder === "asc" ? "ascending" : "descending"}
          )
        </div>
      )}

      <ComparisonTable
        rooms={sortedRooms}
        isExpanded={isExpanded}
        fieldsToShow={fieldsToShow}
      />

      <div className="mt-4 text-center text-sm text-gray-600">
        Showing {sortedRooms.length} room{sortedRooms.length !== 1 ? "s" : ""} •
        Scroll horizontally to view all rooms
      </div>
    </div>
  );
};

export default QuickComparisonTable;
