"use client";

import React from "react";
import { Home, ArrowLeftRight } from "lucide-react";

import { useCompareItems as useRoomComparisonItems } from "./hooks";

import { Button } from "@/app/components/ui/button";
import RoomCompareCard from "@/app/components/compare/rooms/RoomCompareCard";
import QuickComparisonTable from "@/app/components/compare/rooms/QuickComparisonTable";

const Room = () => {
  const { rooms, removeRoom, clearRooms } = useRoomComparisonItems();

  return (
    <div className="space-y-8">
      <div className="text-center bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Home className="w-10 h-10 text-green-600" />
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Compare Rooms</h2>

            <p className="text-gray-600 text-lg mt-1">
              {rooms.length} room{rooms.length !== 1 ? "s" : ""} selected for
              detailed comparison
            </p>

            {rooms.length > 1 && (
              <div className="flex items-center justify-center gap-2 mt-3">
                <ArrowLeftRight className="w-4 h-4 text-green-600" />
                <p className="text-sm text-green-600 font-medium">
                  Compare features, prices, and amenities side by side
                </p>
              </div>
            )}
          </div>
        </div>

        {rooms.length > 0 && (
          <Button
            variant="outline"
            onClick={clearRooms}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 font-medium"
          >
            Clear All Comparisons
          </Button>
        )}
      </div>

      <QuickComparisonTable rooms={rooms} />

      {rooms.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-900 text-center">
            Detailed Room Cards
          </h3>

          <div className="grid gap-6 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1">
            {rooms.map((room, index) => (
              <div key={room.id} className="relative">
                <div className="absolute -top-3 -left-3 z-10 bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
                  {index + 1}
                </div>

                <RoomCompareCard room={room} onRemove={removeRoom} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center bg-green-50 p-12 rounded-xl border border-green-200">
          <Home className="w-16 h-16 text-green-300 mx-auto mb-4" />

          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Rooms to Compare
          </h3>

          <p className="text-gray-600">
            Add rooms to your comparison list to see them here
          </p>
        </div>
      )}
    </div>
  );
};

export default Room;
