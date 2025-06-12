"use client";

import React from "react";
import { Home } from "lucide-react";
import { Control, Controller } from "react-hook-form";
import { UseFormRegister, FieldErrors } from "react-hook-form";

import {
  roomTypeOptions,
  nepalCityOptions,
} from "./config/BasicInformationSection";
import { RoomWithMedia } from "@/app/types/types";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Combobox } from "@/app/components/ui/combobox";
import { FormField } from "@/app/components/ui/form-field";
import { GenericSelect } from "@/app/components/ui/select";

interface BasicInformationSectionProps {
  control: Control<RoomWithMedia>;
  errors: FieldErrors<RoomWithMedia>;
  register: UseFormRegister<RoomWithMedia>;
}

const BasicInformationSection: React.FC<BasicInformationSectionProps> = ({
  errors,
  control,
  register,
}) => {
  return (
    <Card className="border shadow-sm bg-white">
      <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg py-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Home className="h-5 w-5" />
          Basic Information
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            required
            name="name"
            label="Name"
            errors={errors}
            register={register}
            placeholder="e.g., Cozy 2BHK in Thamel"
          />

          <div className="space-y-1">
            <Label className="text-xs font-medium text-gray-700">
              City <span className="text-red-500">*</span>
            </Label>

            <div className="relative">
              <Controller
                name="city"
                control={control}
                rules={{ required: "City is required" }}
                render={({ field }) => (
                  <Combobox
                    className="w-full"
                    allowCustom={true}
                    value={field.value}
                    options={nepalCityOptions}
                    onValueChange={field.onChange}
                    placeholder="Search city or type custom city"
                    emptyMessage="No cities found. Type to add custom city."
                    searchPlaceholder="Type to search or add custom city..."
                  />
                )}
              />
            </div>
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
            )}
          </div>

          <FormField
            required
            name="location"
            errors={errors}
            register={register}
            label="Specific Location"
            placeholder="e.g., Near Ratna Park, Ward 15"
          />

          <div className="space-y-1">
            <Label className="text-xs font-medium text-gray-700">
              Room Type <span className="text-red-500">*</span>
            </Label>

            <Controller
              name="roomType"
              control={control}
              rules={{ required: "Room Type is required" }}
              render={({ field }) => (
                <GenericSelect
                  className="h-9"
                  value={field.value ?? ""}
                  options={roomTypeOptions}
                  onChange={field.onChange}
                  placeholder="Select Room Type"
                />
              )}
            />
            {errors.roomType && (
              <p className="text-red-500 text-xs mt-1">
                {errors.roomType.message}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInformationSection;
