"use client";

import React from "react";
import { Home, Trash2, BarChart3 } from "lucide-react";

import { useInterestedRoomsHandler } from "@/app/common/hooks/interestedRooms";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";

interface RoomsHeaderProps {
  roomsCount: number;
}

const RoomsHeader: React.FC<RoomsHeaderProps> = ({ roomsCount }) => {
  const { handledeleteInterestedRoomsPerUser } = useInterestedRoomsHandler();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center shadow-lg">
            <Home className="w-7 h-7 text-white" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Saved Rooms
            </h2>

            <div className="flex items-center space-x-3">
              <Badge className="bg-green-50 text-green-700 border-green-200 px-3 py-1 font-medium">
                {roomsCount} room{roomsCount > 1 ? "s" : ""} saved
              </Badge>

              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <BarChart3 className="w-4 h-4 text-green-600" />

                <span>Analytics available</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {roomsCount > 0 && (
            <Button
              variant="outline"
              onClick={handledeleteInterestedRoomsPerUser}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300 flex items-center"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomsHeader;
