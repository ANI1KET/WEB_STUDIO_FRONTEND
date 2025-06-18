"use client";

import {
  Home,
  Users,
  MapPin,
  Calendar,
  CalendarPlus,
  CalendarClock,
} from "lucide-react";
import React from "react";
import { format } from "date-fns";
import { FurnishingStatusEnum } from "@prisma/client";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/app/components/ui/card";

interface RoomDetailsMainProps {
  hall: number;
  bedroom: number;
  kitchen: number;
  bathroom: number;
  roomType: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  minCapacity: number;
  maxCapacity: number;
  direction: string | null;
  furnishingStatus: FurnishingStatusEnum;
}

const RoomDetailsMain: React.FC<RoomDetailsMainProps> = ({
  hall,
  bedroom,
  kitchen,
  bathroom,
  roomType,
  createdAt,
  updatedAt,
  direction,
  minCapacity,
  maxCapacity,
  description,
  furnishingStatus,
}) => (
  <Card className="shadow-sm border border-gray-200">
    <CardHeader className="bg-gray-50 border-b">
      <CardTitle className="flex items-center gap-3 text-xl">
        <div className="p-2 bg-green-100 rounded-lg">
          <Home className="h-5 w-5 text-green-600" />
        </div>
        Room Details
      </CardTitle>
    </CardHeader>

    <CardContent className="p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-green-50 rounded-xl transition-all hover:bg-green-100 hover:scale-105 cursor-pointer">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {bedroom}
          </div>
          <div className="text-sm text-gray-600">
            {bedroom > 1 ? "Bedrooms" : "Bedroom"}
          </div>
        </div>

        <div className="text-center p-4 bg-green-50 rounded-xl transition-all hover:bg-green-100 hover:scale-105 cursor-pointer">
          <div className="text-2xl font-bold text-green-600 mb-1">{hall}</div>
          <div className="text-sm text-gray-600">
            {hall > 1 ? "Halls" : "Hall"}
          </div>
        </div>

        <div className="text-center p-4 bg-green-50 rounded-xl transition-all hover:bg-green-100 hover:scale-105 cursor-pointer">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {kitchen}
          </div>
          <div className="text-sm text-gray-600">
            {kitchen > 1 ? "Kitchens" : "Kitchen"}
          </div>
        </div>

        <div className="text-center p-4 bg-green-50 rounded-xl transition-all hover:bg-green-100 hover:scale-105 cursor-pointer">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {bathroom}
          </div>
          <div className="text-sm text-gray-600">
            {bathroom > 1 ? "Bathrooms" : "Bathroom"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Room Type", value: roomType, icon: Home },
          {
            icon: Users,
            label: "Capacity",
            value: `${minCapacity} - ${maxCapacity} people`,
          },
          {
            icon: Calendar,
            label: "Furnishing",
            value: furnishingStatus.replace("_", " "),
          },
          { label: "Direction", value: direction, icon: MapPin },
        ].map((item, idx) => (
          <div key={idx} className="p-3 bg-gray-50 rounded-lg">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-1">
              <item.icon className="h-4 w-4 text-green-600" />
              {item.label}
            </label>
            <p className="text-gray-900">{item.value}</p>
          </div>
        ))}
      </div>

      <hr className="my-2" />

      <div>
        <h3 className="text-lg font-bold">Description</h3>
        <div className={`text-gray-700 leading-relaxed`}>{description}</div>
      </div>

      <hr className="my-2" />

      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-green-600" />
          Listing Timeline
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="group flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-green-100 rounded-xl border border-emerald-200 transition-all duration-300 hover:from-emerald-100 hover:to-green-150 hover:border-emerald-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
            <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-all duration-300 group-hover:scale-110">
              <CalendarClock className="h-5 w-5 text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300" />
            </div>

            <div className="flex-1">
              <p className="font-semibold text-emerald-900 group-hover:text-emerald-800 transition-colors duration-300">
                Last Updated
              </p>
              <p className="text-emerald-700 text-sm group-hover:text-emerald-600 transition-colors duration-300">
                {format(new Date(updatedAt), "MMMM dd, yyyy")}
              </p>
              <p className="text-emerald-600 text-xs group-hover:text-emerald-500 transition-colors duration-300">
                {format(new Date(updatedAt), "h:mm a")}
              </p>
            </div>

            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="group flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 transition-all duration-300 hover:from-blue-100 hover:to-blue-150 hover:border-blue-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-all duration-300 group-hover:scale-110">
              <CalendarPlus className="h-5 w-5 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
            </div>

            <div className="flex-1">
              <p className="font-semibold text-blue-900 group-hover:text-blue-800 transition-colors duration-300">
                Listed On
              </p>
              <p className="text-blue-700 text-sm group-hover:text-blue-600 transition-colors duration-300">
                {format(new Date(createdAt), "MMMM dd, yyyy")}
              </p>
              <p className="text-blue-600 text-xs group-hover:text-blue-500 transition-colors duration-300">
                {format(new Date(createdAt), "h:mm a")}
              </p>
            </div>

            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default React.memo(RoomDetailsMain);
