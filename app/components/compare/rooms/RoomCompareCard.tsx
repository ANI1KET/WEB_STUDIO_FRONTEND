"use client";

import React from "react";

import { RoomData } from "@/app/types/types";

import { Badge } from "@/app/components/ui/badge";
import RoomCardHeader from "./RoomCompareCard/RoomCardHeader";
import RoomDetailsGrid from "./RoomCompareCard/RoomDetailsGrid";
import RoomMediaSection from "./RoomCompareCard/RoomMediaSection";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import RoomAmenitiesDisplay from "./RoomCompareCard/RoomAmenitiesDisplay";

interface RoomCompareCardProps {
  room: RoomData;
  onRemove: (id: string) => void;
}

const RoomCompareCard = ({ room, onRemove }: RoomCompareCardProps) => {
  const handleRemove = () => {
    onRemove(room.id);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 border-2 hover:shadow-xl hover:border-green-200">
      <CardHeader className="p-0">
        <div className="relative">
          <RoomMediaSection
            id={room.id}
            photos={room.photos}
            videos={room.videos}
            onRemove={handleRemove}
            verified={room.verified}
          />

          <RoomCardHeader
            city={room.city}
            name={room.title}
            location={room.location}
          />
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <div className="text-center mb-4 p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
          <div className="text-3xl font-bold text-green-600">
            ₹{room.price.toLocaleString()}
            <span className="text-sm text-gray-500 font-normal">/month</span>
          </div>
        </div>

        <RoomDetailsGrid
          hall={room.hall}
          ratings={room.ratings}
          bedroom={room.bedroom}
          kitchen={room.kitchen}
          roomType={room.roomType}
          bathroom={room.bathroom}
          postedBy={room.postedBy}
          minCapacity={room.minCapacity}
          maxCapacity={room.maxCapacity}
        />

        <div className="mb-4">
          <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg border border-green-200">
            <span className="text-sm font-medium text-gray-700">
              Furnishing
            </span>

            <Badge
              variant="outline"
              className="text-xs font-medium bg-white border-green-300 text-green-700"
            >
              {room.furnishingStatus}
            </Badge>
          </div>
        </div>

        <RoomAmenitiesDisplay amenities={room.amenities} />
      </CardContent>
    </Card>
  );
};

export default RoomCompareCard;
