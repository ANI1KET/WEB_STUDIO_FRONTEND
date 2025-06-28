"use client";

import React from "react";
import { MapPin } from "lucide-react";

interface RoomTitleSectionProps {
  city: string;
  title: string;
  location: string;
}

const RoomTitleSection: React.FC<RoomTitleSectionProps> = ({
  city,
  title,
  location,
}) => {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
        {title}
      </h1>
      <div className="flex items-center text-gray-600 text-lg">
        <MapPin className="h-5 w-5 text-green-600 mr-2" />
        <span className="font-medium">
          {location}, {city}
        </span>
      </div>
    </div>
  );
};

export default RoomTitleSection;
