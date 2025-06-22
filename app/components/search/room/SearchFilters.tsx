"use client";

import React from "react";
import { Divider } from "@mui/material";

import {
  formatPrice,
  // formatRating,
  formatCapacity,
} from "@/app/lib/formatters";
import {
  postedBy,
  roomType,
  roomAmenities,
  furnishingStatus,
} from "@/app/common/config/Room";
import { useRoomFilterUpdater } from "./hooks/SearchFilters";
import { useGetRoomSearchData } from "@/app/providers/reactqueryProvider";

import { Label } from "@/app/components/ui/label";
import { Checkbox } from "@/app/components/ui/checkbox";
import { DoubleSlider } from "@/app/components/ui/slider/DoubleSlider";

const RoomFilterComponent = () => {
  const updateFilter = useRoomFilterUpdater();
  const roomSearchData = useGetRoomSearchData();

  const roomTypeSet = React.useMemo(
    () => new Set(roomSearchData.roomType ?? []),
    [roomSearchData.roomType]
  );
  const roomFurnishingSet = React.useMemo(
    () => new Set(roomSearchData.furnishingStatus ?? []),
    [roomSearchData.furnishingStatus]
  );
  const roomAmenitiesSet = React.useMemo(
    () => new Set(roomSearchData.amenities ?? []),
    [roomSearchData.amenities]
  );
  const roomPostedBySet = React.useMemo(
    () => new Set(roomSearchData.postedBy ?? []),
    [roomSearchData.postedBy]
  );

  return (
    <div className="flex flex-col gap-2">
      <div>
        <DoubleSlider
          min={1}
          step={1}
          max={25}
          label="Capacity"
          showTooltip="auto"
          valueFormatter={formatCapacity}
          defaultValue={roomSearchData.capacity ?? [2, 5]}
          onValueChange={(newValue) => updateFilter("capacity", newValue)}
        />
      </div>

      {/* <div className="">
        <DoubleSlider
          min={1}
          max={5}
          step={1}
          label="Rating"
          showTooltip="auto"
          valueFormatter={formatRating}
          defaultValue={roomSearchData.rating ?? [2, 3]}
          onValueChange={(newValue) => updateFilter("rating", newValue)}
        />
      </div> */}

      <div className="">
        <DoubleSlider
          min={1000}
          step={1000}
          max={100000}
          label="Price"
          showTooltip="auto"
          valueFormatter={formatPrice}
          defaultValue={roomSearchData.price ?? [5000, 20000]}
          onValueChange={(newValue) => updateFilter("price", newValue)}
        />
      </div>

      <Divider />

      <div className="text-center">
        <Label className="">Room Type</Label>
        <div className="grid grid-cols-3 gap-2">
          {roomType.map((value) => (
            <div key={value} className="flex items-center gap-2">
              <Checkbox
                id={`room-type-${value}`}
                checked={roomTypeSet.has(value)}
                onCheckedChange={() => {
                  const updated = roomTypeSet.has(value)
                    ? roomSearchData.roomType?.filter((v) => v !== value)
                    : [...roomTypeSet, value];

                  updateFilter("roomType", updated);
                }}
              />
              <label htmlFor={`room-type-${value}`} className="text-sm">
                {value}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      <div className="text-center">
        <Label className="">Furnishing</Label>
        <div className="grid grid-cols-2 gap-2">
          {furnishingStatus.map((value) => (
            <div key={value} className="flex items-center gap-2">
              <Checkbox
                id={`furnishing-${value}`}
                checked={roomFurnishingSet.has(value)}
                onCheckedChange={() => {
                  const updated = roomFurnishingSet.has(value)
                    ? roomSearchData.furnishingStatus?.filter(
                        (v) => v !== value
                      )
                    : [...roomFurnishingSet, value];

                  updateFilter("furnishingStatus", updated);
                }}
              />
              <label htmlFor={`furnishing-${value}`} className="text-sm">
                {value}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      <div className="text-center">
        <Label className="">Amenities</Label>
        <div className="grid grid-cols-3 gap-2">
          {roomAmenities.map((value) => (
            <div key={value} className="flex items-center gap-2">
              <Checkbox
                id={`amenity-${value}`}
                checked={roomAmenitiesSet.has(value)}
                onCheckedChange={() => {
                  const updated = roomAmenitiesSet.has(value)
                    ? roomSearchData.amenities?.filter((v) => v !== value)
                    : [...roomAmenitiesSet, value];

                  updateFilter("amenities", updated);
                }}
              />
              <label htmlFor={`amenity-${value}`} className="text-sm">
                {value}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      <div className="text-center">
        <Label className="">Posted By</Label>
        <div className="w-full flex">
          {postedBy.map((value) => (
            <div key={value} className="w-1/2 flex items-center gap-2">
              <Checkbox
                id={`postedBy-${value}`}
                checked={roomPostedBySet.has(value)}
                onCheckedChange={() => {
                  const updated = roomPostedBySet.has(value)
                    ? roomSearchData.postedBy?.filter((v) => v !== value)
                    : [...roomPostedBySet, value];

                  updateFilter("postedBy", updated);
                }}
              />
              <label htmlFor={`postedBy-${value}`} className="text-sm">
                {value}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(RoomFilterComponent);
