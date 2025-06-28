"use client";

import {
  Bed,
  // Star,
  Bath,
  Users,
  LayoutGrid,
  CookingPot,
} from "lucide-react";
import React from "react";

import { Badge } from "@/app/components/ui/badge";

interface RoomDetailsGridProps {
  hall: number;
  ratings: number;
  bedroom: number;
  kitchen: number;
  roomType: string;
  postedBy: string;
  bathroom: number;
  minCapacity: number;
  maxCapacity: number;
}

const RoomDetailsGrid = ({
  hall,
  bedroom,
  // ratings,
  kitchen,
  postedBy,
  // roomType,
  bathroom,
  minCapacity,
  maxCapacity,
}: RoomDetailsGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 mb-4">
      {/* <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
        <span className="text-xs text-gray-600">Rating</span>
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
          <span className="text-sm font-semibold">{ratings}</span>
        </div>
      </div> */}

      <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
        <span className="text-xs text-gray-600">Capacity</span>
        <div className="flex items-center gap-1">
          <Users className="w-3 h-3 text-blue-500" />
          <span className="text-sm font-semibold">
            {minCapacity}-{maxCapacity}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
        <span className="text-xs text-gray-600">Posted By</span>
        <Badge
          className={`text-xs ${
            postedBy === "OWNER"
              ? "bg-green-100 text-green-800"
              : postedBy === "BROKER"
              ? "bg-blue-100 text-blue-800"
              : "bg-purple-100 text-purple-800"
          }`}
        >
          {postedBy?.toLowerCase()}
        </Badge>
      </div>

      {/* <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
        <span className="text-xs text-gray-600">Type</span>
        <Badge variant="outline" className="text-xs font-medium">
          {roomType}
        </Badge>
      </div> */}

      <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
        <span className="text-xs text-gray-600">Bedrooms</span>
        <div className="flex items-center gap-1">
          <Bed className="w-3 h-3 text-blue-500" />
          <span className="text-sm font-semibold">{bedroom}</span>
        </div>
      </div>

      <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
        <span className="text-xs text-gray-600">Halls</span>
        <div className="flex items-center gap-1">
          <LayoutGrid className="w-3 h-3 text-blue-500" />
          <span className="text-sm font-semibold">{hall}</span>
        </div>
      </div>

      <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
        <span className="text-xs text-gray-600">Kitchens</span>
        <div className="flex items-center gap-1">
          <CookingPot className="w-3 h-3 text-blue-500" />
          <span className="text-sm font-semibold">{kitchen}</span>
        </div>
      </div>

      <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
        <span className="text-xs text-gray-600">Bathrooms</span>
        <div className="flex items-center gap-1">
          <Bath className="w-3 h-3 text-blue-500" />
          <span className="text-sm font-semibold">{bathroom}</span>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsGrid;
