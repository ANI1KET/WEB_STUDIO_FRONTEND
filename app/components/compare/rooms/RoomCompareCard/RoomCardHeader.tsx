"use client";

import React from "react";
import { MapPin } from "lucide-react";

import { CardTitle } from "@/app/components/ui/card";

interface RoomCardHeaderProps {
  name: string;
  city: string;
  location: string;
}

const RoomCardHeader = ({ name, location, city }: RoomCardHeaderProps) => {
  return (
    <div className="p-4 pb-2">
      <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2 mb-2">
        {name}
      </CardTitle>
      <div className="flex items-center text-gray-600 text-sm mb-3">
        <MapPin className="w-4 h-4 mr-1 text-blue-500" />
        <span>
          {location}, {city}
        </span>
      </div>
    </div>
  );
};

export default RoomCardHeader;
