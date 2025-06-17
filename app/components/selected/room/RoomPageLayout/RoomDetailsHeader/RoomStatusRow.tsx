"use client";

import React from "react";
import { Star, CheckCircle, XCircle } from "lucide-react";

import { Badge } from "@/app/components/ui/badge";

interface RoomStatusRowProps {
  ratings: number;
  verified: boolean;
  available: boolean;
}

const RoomStatusRow: React.FC<RoomStatusRowProps> = ({
  ratings,
  verified,
  available,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3 pt-2">
      <Badge
        variant="outline"
        className="text-base font-normal border-yellow-300 text-yellow-800 bg-yellow-100/70 py-1 px-3 hover:shadow-md transition-shadow"
      >
        <Star className="h-4 w-4 mr-1.5 fill-current" />
        <span className="font-semibold">{ratings} Rating</span>
      </Badge>

      {verified && (
        <Badge
          variant="outline"
          className="text-base font-normal border-green-300 text-green-800 bg-green-100/70 py-1 px-3 hover:shadow-md transition-shadow"
        >
          <CheckCircle className="h-4 w-4 mr-1.5" />
          <span className="font-semibold">Verified</span>
        </Badge>
      )}

      <Badge
        variant="outline"
        className={`text-base font-normal py-1 px-3 hover:shadow-md transition-shadow ${
          available
            ? "border-blue-300 text-blue-800 bg-blue-100/70"
            : "border-red-300 text-red-800 bg-red-100/70"
        }`}
      >
        {available ? (
          <>
            <CheckCircle className="h-4 w-4 mr-1.5" />
            <span className="font-semibold">Available</span>
          </>
        ) : (
          <>
            <XCircle className="h-4 w-4 mr-1.5" />
            <span className="font-semibold">Occupied</span>
          </>
        )}
      </Badge>
    </div>
  );
};

export default RoomStatusRow;
