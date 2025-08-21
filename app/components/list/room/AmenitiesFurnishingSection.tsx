"use client";

import React from "react";
import { Wifi } from "lucide-react";

import { FurnishingStatus, RoomAmenities } from "@/app/types/types";
import { amenitiesList } from "./config/AmenitiesFurnishingSection";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Checkbox } from "@/app/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";

interface AmenitiesFurnishingSectionProps {
  furnishingStatus: FurnishingStatus;
  selectedAmenities: RoomAmenities[];
  onFurnishingStatusChange: (status: FurnishingStatus) => void;
  onAmenityChange: (amenity: RoomAmenities, checked: boolean) => void;
}

const AmenitiesFurnishingSection: React.FC<AmenitiesFurnishingSectionProps> = ({
  onAmenityChange,
  furnishingStatus,
  selectedAmenities,
  onFurnishingStatusChange,
}) => {
  return (
    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-3 text-xl">
          <Wifi className="h-6 w-6" />
          Amenities & Furnishing
        </CardTitle>
      </CardHeader>

      <CardContent className="p-8 space-y-6">
        <div>
          <Label className="text-sm font-semibold text-gray-800 mb-4 block">
            Available Amenities
          </Label>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {amenitiesList.map((amenity) => (
              <div
                key={amenity}
                className="flex items-center space-x-3 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors"
              >
                <Checkbox
                  id={amenity}
                  checked={selectedAmenities.includes(amenity)}
                  onCheckedChange={(checked) =>
                    onAmenityChange(amenity, checked as boolean)
                  }
                  className="data-[state=checked]:bg-purple-600"
                />

                <Label
                  htmlFor={amenity}
                  className="text-sm text-gray-700 cursor-pointer font-medium"
                >
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-semibold text-gray-800 mb-4 block">
            Furnishing Status
          </Label>

          <RadioGroup
            value={furnishingStatus}
            onValueChange={(value) =>
              onFurnishingStatusChange(value as FurnishingStatus)
            }
            className="flex flex-col space-y-3"
          >
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
              <RadioGroupItem
                id="fully"
                value="FURNISHED"
                className="text-purple-600"
              />
              <Label htmlFor="fully" className="font-medium">
                Fully Furnished
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
              <RadioGroupItem
                id="semi"
                value="SEMIFURNISHED"
                className="text-purple-600"
              />
              <Label htmlFor="semi" className="font-medium">
                Semi Furnished
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
              <RadioGroupItem
                id="unfurnished"
                value="UNFURNISHED"
                className="text-purple-600"
              />
              <Label htmlFor="unfurnished" className="font-medium">
                Unfurnished
              </Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default AmenitiesFurnishingSection;
