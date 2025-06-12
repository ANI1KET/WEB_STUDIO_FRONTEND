"use client";

import {
  FieldErrors,
  UseFormSetValue,
  UseFormRegister,
  UseFormGetValues,
} from "react-hook-form";
import React from "react";
import { MapPin } from "lucide-react";

import { RoomWithMedia } from "@/app/types/types";
import { directionOptions } from "./config/RoomDetailsSection";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { GenericSelect } from "@/app/components/ui/select";
import { FormField } from "@/app/components/ui/form-field";

interface RoomDetailsSectionProps {
  direction: string;
  errors: FieldErrors<RoomWithMedia>;
  register: UseFormRegister<RoomWithMedia>;
  setValue: UseFormSetValue<RoomWithMedia>;
  getValues: UseFormGetValues<RoomWithMedia>;
}

const RoomDetailsSection: React.FC<RoomDetailsSectionProps> = ({
  errors,
  setValue,
  register,
  getValues,
  direction,
}) => {
  return (
    <Card className="border shadow-sm bg-white">
      <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg py-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MapPin className="h-5 w-5" />
          Room Details
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <FormField
            min={0}
            required
            type="number"
            name="bedroom"
            placeholder="0"
            errors={errors}
            label="Bedrooms"
            register={register}
          />
          <FormField
            min={0}
            required
            name="hall"
            label="Halls"
            type="number"
            placeholder="0"
            errors={errors}
            register={register}
          />
          <FormField
            min={0}
            required
            type="number"
            name="kitchen"
            placeholder="0"
            errors={errors}
            label="Kitchens"
            register={register}
          />
          <FormField
            min={0}
            required
            type="number"
            name="bathroom"
            placeholder="0"
            errors={errors}
            label="Bathrooms"
            register={register}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            min={1}
            required
            type="number"
            placeholder="1"
            errors={errors}
            name="minCapacity"
            register={register}
            label="Min Capacity"
          />

          <FormField
            min={1}
            required
            type="number"
            placeholder="2"
            errors={errors}
            name="maxCapacity"
            register={register}
            label="Max Capacity"
            validation={{
              required: "Max Capacity is required",
              min: { value: 1, message: "Min value is 1" },
              validate: (value) =>
                Number(value) > Number(getValues("minCapacity")) ||
                "Max Capacity must be > Min Capacity",
            }}
          />

          <div className="space-y-1">
            <Label className="text-xs font-medium text-gray-700">
              Direction
            </Label>

            <GenericSelect
              className="h-9"
              value={direction}
              options={directionOptions}
              placeholder="Select Direction"
              onChange={(value) => setValue("direction", value)}
            />
          </div>

          <FormField
            min={0}
            required
            name="price"
            type="number"
            errors={errors}
            register={register}
            placeholder="25000"
            label="Monthly Rent (NPR)"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomDetailsSection;
