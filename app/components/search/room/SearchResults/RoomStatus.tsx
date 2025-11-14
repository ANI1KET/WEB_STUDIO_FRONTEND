"use client";

import React from "react";

import { Badge } from "@/app/components/ui/badge";

interface RoomStatusProps {
  available: boolean;
}

const RoomStatus: React.FC<RoomStatusProps> = ({ available }) => (
  <div className="absolute top-3 left-3 flex gap-2">
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
