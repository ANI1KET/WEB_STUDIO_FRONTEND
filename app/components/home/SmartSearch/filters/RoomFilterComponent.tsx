"use client";

import React from "react";
import { Divider } from "@mui/material";

import {
  formatPrice,
  formatRating,
  formatCapacity,
} from "@/app/lib/formatters";
import {
  postedBy,
  roomType,
  roomAmenities,
  furnishingStatus,
} from "./config/RoomFilterComponent";
import {
  useGetRoomSearchData,
  useUpdateRoomSearchData,
} from "@/app/providers/reactqueryProvider";

import { Label } from "@/app/components/ui/label";
import { Checkbox } from "@/app/components/ui/checkbox";
import { DoubleSlider } from "@/app/components/ui/slider/DoubleSlider";

const RoomFilterComponent = () => {
  const roomSearchData = useGetRoomSearchData();
  const updateRoomSearchData = useUpdateRoomSearchData();

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
    <div className="flex flex-col gap-2 p-2">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <DoubleSlider
            min={1}
            step={1}
            max={25}
            label="Capacity"
            showTooltip="auto"
            valueFormatter={formatCapacity}
            defaultValue={roomSearchData.capacity ?? [2, 5]}
            onValueChange={(newValue) =>
              updateRoomSearchData({
                ...roomSearchData,
                capacity: newValue,
              })
            }
          />
        </div>

        <div className="">
          <DoubleSlider
            min={1}
            max={5}
            step={1}
            label="Rating"
            showTooltip="auto"
            valueFormatter={formatRating}
            defaultValue={roomSearchData.rating ?? [2, 3]}
            onValueChange={(newValue) =>
              updateRoomSearchData({
                ...roomSearchData,
                rating: newValue,
              })
            }
          />
        </div>
      </div>

      <div className="">
        <DoubleSlider
          min={1000}
          step={1000}
          max={100000}
          label="Price"
          showTooltip="auto"
          valueFormatter={formatPrice}
          defaultValue={roomSearchData.price ?? [5000, 20000]}
          onValueChange={(newValue) =>
            updateRoomSearchData({
              ...roomSearchData,
              price: newValue,
            })
          }
        />
      </div>

      <Divider />

      <div className="">
        <Label className="">Room Type</Label>
        <div className="grid grid-cols-3 gap-2">
          {roomType.map((value) => (
            <div key={value} className="flex items-center gap-2">
              <Checkbox
                id={`room-type-${value}`}
                checked={roomTypeSet.has(value)}
                onCheckedChange={() =>
                  updateRoomSearchData({
                    ...roomSearchData,
                    roomType: roomTypeSet.has(value)
                      ? roomSearchData.roomType?.filter(
                          (check) => check !== value
                        )
                      : [...roomTypeSet, value],
                  })
                }
              />
              <label htmlFor={`room-type-${value}`} className="text-sm">
                {value}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      <div className="">
        <Label className="">Furnishing</Label>
        <div className="grid grid-cols-3 gap-2">
          {furnishingStatus.map((value) => (
            <div key={value} className="flex items-center gap-2">
              <Checkbox
                id={`furnishing-${value}`}
                checked={roomFurnishingSet.has(value)}
                onCheckedChange={() =>
                  updateRoomSearchData({
                    ...roomSearchData,
                    furnishingStatus: roomFurnishingSet.has(value)
                      ? roomSearchData.furnishingStatus?.filter(
                          (check) => check !== value
                        )
                      : [...roomFurnishingSet, value],
                  })
                }
              />
              <label htmlFor={`furnishing-${value}`} className="text-sm">
                {value}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      <div className="">
        <Label className="">Amenities</Label>
        <div className="grid grid-cols-3 gap-2">
          {roomAmenities.map((value) => (
            <div key={value} className="flex items-center gap-2">
              <Checkbox
                id={`amenity-${value}`}
                checked={roomAmenitiesSet.has(value)}
                onCheckedChange={() =>
                  updateRoomSearchData({
                    ...roomSearchData,
                    amenities: roomAmenitiesSet.has(value)
                      ? roomSearchData.amenities?.filter(
                          (check) => check !== value
                        )
                      : [...roomAmenitiesSet, value],
                  })
                }
              />
              <label htmlFor={`amenity-${value}`} className="text-sm">
                {value}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      <div className="">
        <Label className="">Posted By</Label>
        <div className="w-full flex justify-around gap-2">
          {postedBy.map((value) => (
            <div key={value} className="flex items-center gap-2">
              <Checkbox
                id={`postedBy-${value}`}
                checked={roomPostedBySet.has(value)}
                onCheckedChange={() =>
                  updateRoomSearchData({
                    ...roomSearchData,
                    postedBy: roomPostedBySet.has(value)
                      ? roomSearchData.postedBy?.filter(
                          (check) => check !== value
                        )
                      : [...roomPostedBySet, value],
                  })
                }
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

export default RoomFilterComponent;
