"use client";

import React from "react";
import { Sparkles } from "lucide-react";

import { RoomAmenities } from "@/app/types/types";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/app/components/ui/card";

interface RoomAmenitiesProps {
  amenities: RoomAmenities[];
  getAmenityIcon: (amenity: RoomAmenities, size: number) => React.JSX.Element;
}

const RoomAmenitiesLayout: React.FC<RoomAmenitiesProps> = ({
  amenities,
  getAmenityIcon,
}) => (
  <Card className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-green-100/50 overflow-hidden hover:shadow-xl transition-all duration-300">
    <CardHeader className="border-b border-green-100/50">
      <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-800">
        <div className="p-2 bg-green-100 rounded-lg">
          <Sparkles className="h-5 w-5 text-green-600" />
        </div>
        What this room offers
      </CardTitle>
    </CardHeader>

    <CardContent className="p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {amenities.map((amenity, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-3 bg-green-50/70 rounded-xl border border-green-100/80 transition-all duration-300 hover:bg-green-100 hover:shadow-md hover:scale-[1.03] cursor-pointer"
          >
            <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg text-white shadow-md">
              {getAmenityIcon(amenity, 20) || <Sparkles size={20} />}
            </div>

            <span className="text-sm font-semibold text-green-800">
              {amenity}
            </span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default React.memo(RoomAmenitiesLayout);
