"use client";

import React from "react";
import { CheckCircle } from "lucide-react";

import { Badge } from "@/app/components/ui/badge";

interface RoomStatusProps {
  verified: boolean;
  available: boolean;
}

const RoomStatus: React.FC<RoomStatusProps> = ({ verified, available }) => (
  <div className="absolute top-3 left-3 flex gap-2">
    {verified && (
      <Badge className="bg-emerald-500 text-white border-0 shadow-lg">
        <CheckCircle className="h-3 w-3 mr-1" />
        Verified
      </Badge>
    )}
    <Badge
      className={`${
        available ? "bg-green-500" : "bg-red-500"
      } text-white border-0 shadow-lg`}
    >
      {available ? "Available" : "Occupied"}
    </Badge>
  </div>
);

export default React.memo(RoomStatus);
