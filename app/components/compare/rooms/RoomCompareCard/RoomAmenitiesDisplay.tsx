"use client";

import React from "react";

import { RoomAmenities } from "@/app/types/types";

import { Badge } from "@/app/components/ui/badge";

interface RoomAmenitiesDisplayProps {
  amenities: RoomAmenities[];
}

const RoomAmenitiesDisplay = ({ amenities }: RoomAmenitiesDisplayProps) => {
  return (
    <div className="mb-4">
      <h4 className="text-sm font-semibold text-gray-900 mb-2">Amenities</h4>
      <div className="flex flex-wrap gap-1">
        {amenities.map((amenity: string, index: number) => (
          <Badge
            key={index}
            variant="outline"
            className="text-xs bg-green-50 text-green-700 border-green-200"
          >
            {amenity.replace("_", " ")}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default RoomAmenitiesDisplay;
