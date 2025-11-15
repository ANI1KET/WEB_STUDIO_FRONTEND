"use client";

import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

import { RoomData } from "@/app/types/types";
import { getAmenityIcon } from "@/app/common/icon/amenities";

import { CarouselItem } from "@/app/components/ui/carousel";
import { Card, CardContent } from "@/app/components/ui/card";
import FeatureRoomImageCarousel from "./FeatureRoomImageCarousel";

const FeatureRoomCard = ({ room }: { room: RoomData }) => {
  const router = useRouter();

  return (
    <CarouselItem>
      <Card className="flex flex-col h-[320px] group hover:shadow-xl transition-all duration-300 border border-white/20 overflow-hidden rounded-2xl bg-white/95 backdrop-blur-sm shadow-md cursor-pointer transform">
        <FeatureRoomImageCarousel room={room} />

        <CardContent className="p-2 space-y-1 flex-1 flex flex-col justify-between">
          <div>
            <h3
              title={room.title}
              className="font-bold text-gray-900 text-sm leading-tight line-clamp-1"
            >
              {room.title}
            </h3>

            <div className="flex items-center gap-1 text-[11px] text-gray-600 mb-2">
              <MapPin className="w-3 h-3 text-green-500 flex-shrink-0" />
              <span
                className="font-medium truncate"
                title={`${room.location}, ${room.city}`}
              >
                {room.location}, {room.city}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1 text-[9px]">
              <div className="bg-purple-50 rounded p-0.5 text-center">
                <span className="text-purple-600 block font-semibold">
                  {room.bedroom}
                </span>

                <span className="text-purple-500 text-[8px]">Bedroom</span>
              </div>

              <div className="bg-purple-50 rounded p-0.5 text-center">
                <span className="text-purple-600 block font-semibold">
                  {room.hall}
                </span>

                <span className="text-purple-500 text-[8px]">Hall</span>
              </div>

              <div className="bg-purple-50 rounded p-0.5 text-center">
                <span className="text-purple-600 block font-semibold">
                  {room.kitchen}
                </span>

                <span className="text-purple-500 text-[8px]">Kitchen</span>
              </div>

              <div className="bg-purple-50 rounded p-0.5 text-center">
                <span className="text-purple-600 block font-semibold">
                  {room.bathroom}
                </span>

                <span className="text-purple-500 text-[8px]">Bath</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1 text-[9px]">
            <div className="bg-teal-50 rounded p-0.5">
              <span className="text-teal-600 block text-[8px]">Furnishing</span>

              <span className="font-semibold text-teal-600 truncate block">
                {room.furnishingStatus}
              </span>
            </div>

            <div className="bg-teal-50 rounded p-0.5">
              <span className="text-teal-600 block text-[8px]">Capacity</span>

              <span className="font-semibold text-teal-600 truncate block">
                {room.minCapacity}-{room.maxCapacity}
              </span>
            </div>
          </div>

          {room.amenities && room.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {room.amenities.slice(0, 3).map((amenity, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-0.5 bg-green-50 text-green-700 px-1.5 py-0.5 rounded text-[10px] font-medium"
                >
                  {getAmenityIcon(amenity, 10)}
                  <span className="truncate">{amenity}</span>
                </div>
              ))}

              {room.amenities.length > 3 && (
                <div className="bg-gray-50 text-gray-600 px-1.5 py-0.5 rounded text-[8px] font-medium">
                  +{room.amenities.length - 3}
                </div>
              )}
            </div>
          )}

          <div className="mt-auto">
            <button
              onClick={() => router.push(`/room/${btoa(room.id)}`)}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-1 px-2 rounded-lg font-semibold text-[11px] hover:shadow-lg transition-all duration-200"
            >
              <span className="flex items-center justify-center gap-1">
                <span>View Details</span>

                <svg
                  className="w-2.5 h-2.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </button>
          </div>
        </CardContent>
      </Card>
    </CarouselItem>
  );
};
export default FeatureRoomCard;
