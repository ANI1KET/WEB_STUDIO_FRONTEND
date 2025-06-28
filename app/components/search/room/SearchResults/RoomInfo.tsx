"use client";

import {
  Users,
  // Star,
  MapPin,
} from "lucide-react";
import React from "react";

import { Badge } from "@/app/components/ui/badge";

interface RoomInfoProps {
  city: string;
  title: string;
  price: number;
  ratings: number;
  location: string;
  roomType: string;
  postedBy: string;
  minCapacity: number;
  maxCapacity: number;
  furnishingStatus: string;
}

const RoomInfo: React.FC<RoomInfoProps> = ({
  title,
  city,
  price,
  // ratings,
  location,
  postedBy,
  roomType,
  minCapacity,
  maxCapacity,
  furnishingStatus,
}) => (
  <div className="p-4 space-y-3 flex-grow flex flex-col">
    <div className="flex-grow">
      <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">
        {title}
      </h3>
      <div className="flex items-center text-gray-500 text-sm mb-2">
        <MapPin className="h-4 w-4 mr-1 text-green-600" />
        {location}, {city}
      </div>
    </div>

    <div className="flex items-center justify-between">
      <div className="text-2xl font-bold text-green-600">
        ₹{price.toLocaleString()}
        <span className="text-sm text-gray-500 font-normal">/month</span>
      </div>

      <Badge variant="outline" className="text-xs font-medium">
        {roomType}
      </Badge>
    </div>

    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-3">
        {/* <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
          <span className="text-sm font-medium">{ratings}</span>
        </div> */}

        <div className="flex items-center gap-1">
          <Users className="h-4 w-4 text-blue-500" />
          <span className="text-sm">
            {minCapacity} - {maxCapacity}
          </span>
        </div>
      </div>

      <Badge variant="outline" className="text-xs">
        {furnishingStatus}
      </Badge>
    </div>

    <div className="text-center border-t border-gray-100">
      <Badge
        className={`text-xs ${
          postedBy === "OWNER"
            ? "bg-green-100 text-green-800"
            : postedBy === "BROKER"
            ? "bg-blue-100 text-blue-800"
            : "bg-purple-100 text-purple-800"
        }`}
      >
        Posted by {postedBy.toLowerCase()}
      </Badge>
    </div>
  </div>
);

export default React.memo(RoomInfo);
