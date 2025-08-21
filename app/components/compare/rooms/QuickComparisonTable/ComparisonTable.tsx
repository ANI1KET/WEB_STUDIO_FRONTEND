"use client";

import React from "react";

import { RoomData } from "@/app/types/types";
import { ComparisonTableProps, TableRowProps } from "./types";

import { Badge } from "@/app/components/ui/badge";

const ComparisonTable = ({
  rooms,
  isExpanded,
  fieldsToShow,
}: ComparisonTableProps) => {
  return (
    <div className="overflow-x-auto -mx-3 sm:mx-0">
      <div className="min-w-max">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2 sm:p-3 font-semibold text-gray-700 sticky left-0 bg-white z-30 min-w-[100px] sm:min-w-[120px] shadow-sm">
                Feature
              </th>

              {rooms.map((room, index) => (
                <th
                  key={room.id}
                  className="text-center p-2 sm:p-3 font-semibold text-gray-700 min-w-[120px] sm:min-w-[150px]"
                >
                  <div className="flex flex-col items-center gap-1">
                    <Badge variant="outline" className="text-xs">
                      Room {index + 1}
                    </Badge>
                    <span className="text-xs text-gray-500 line-clamp-1 max-w-[100px] sm:max-w-none">
                      {room.title}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {fieldsToShow.map((field) => (
              <TableRow field={field} rooms={rooms} key={field.key} />
            ))}

            {isExpanded && <AmenitiesRow rooms={rooms} />}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;

const AmenitiesRow = ({ rooms }: { rooms: RoomData[] }) => {
  return (
    <tr className="border-b">
      <td className="p-2 sm:p-3 font-medium sticky left-0 bg-gray-50 z-20 text-xs sm:text-sm shadow-sm border-r border-gray-200">
        All Amenities
      </td>

      {rooms.map((room) => (
        <td key={room.id} className="p-2 sm:p-3 text-center">
          <div className="flex flex-wrap gap-1 justify-center max-w-[140px] sm:max-w-[200px]">
            {room.amenities.map((amenity, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {amenity.replace("_", " ")}
              </Badge>
            ))}
          </div>
        </td>
      ))}
    </tr>
  );
};

const TableRow = ({ field, rooms }: TableRowProps) => {
  return (
    <tr className={"border-b bg-gray-50"}>
      <td className="p-2 sm:p-3 font-medium sticky left-0 bg-inherit z-20 text-xs sm:text-sm shadow-sm border-r border-gray-200">
        {field.label}
      </td>
      {rooms.map((room) => (
        <td key={room.id} className="p-2 sm:p-3 text-center text-xs sm:text-sm">
          <div
            className={`${
              field.key === "price"
                ? "font-bold text-green-600"
                : field.key === "verified" && room.verified
                ? "text-green-600"
                : field.key === "verified" && !room.verified
                ? "text-red-600"
                : ""
            }`}
          >
            {field.format(room[field.key as keyof RoomData], room)}
          </div>
        </td>
      ))}
    </tr>
  );
};
