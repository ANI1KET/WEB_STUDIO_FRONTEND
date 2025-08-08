"use client";

import { UseFormSetValue } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { DollarSign, Video, MapPin, Edit2, Check, X } from "lucide-react";

import { ServiceData } from "../types/ListingServiceCard";

import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";

interface PricingSectionProps {
  virtualPrice: number;
  physicalPrice: number;
  editingField: string | null;
  onEditStart: (field: string) => void;
  setValue: UseFormSetValue<ServiceData>;
}

const PricingSection = ({
  setValue,
  onEditStart,
  editingField,
  virtualPrice,
  physicalPrice,
}: PricingSectionProps) => {
  const [tempVirtualPrice, setTempVirtualPrice] = useState(0);
  const [tempPhysicalPrice, setTempPhysicalPrice] = useState(0);

  useEffect(() => {
    setTempVirtualPrice(virtualPrice);
    setTempPhysicalPrice(physicalPrice);
  }, [virtualPrice, physicalPrice]);

  const handleCancel = (type: "virtual" | "physical") => {
    if (type === "virtual") {
      setTempVirtualPrice(virtualPrice);
    } else {
      setTempPhysicalPrice(physicalPrice);
    }
    onEditStart("");
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-blue-100">
      <div className="flex items-center gap-2 mb-4">
        <DollarSign className="w-5 h-5 text-blue-600" />

        <h3 className="text-lg font-semibold text-gray-900">Visit Pricing</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Virtual Visit Price */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Video className="w-4 h-4 text-blue-500" />
            Virtual Visit Price
          </Label>

          {editingField === "virtualPrice" ? (
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  ₹
                </span>

                <Input
                  min="0"
                  type="number"
                  placeholder="0"
                  className="pl-8"
                  value={tempVirtualPrice}
                  onChange={(e) => setTempVirtualPrice(Number(e.target.value))}
                />
              </div>

              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setValue("virtualPrice", Number(tempVirtualPrice));
                  onEditStart("");
                }}
              >
                <Check className="w-4 h-4" />
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCancel("virtual")}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border">
              <span className="font-medium text-gray-900">₹{virtualPrice}</span>

              <Button
                size="sm"
                variant="ghost"
                onClick={() => onEditStart("virtualPrice")}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Physical Visit Price */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <MapPin className="w-4 h-4 text-green-500" />
            Physical Visit Price
          </Label>

          {editingField === "physicalPrice" ? (
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  ₹
                </span>

                <Input
                  min="0"
                  type="number"
                  placeholder="0"
                  className="pl-8"
                  value={tempPhysicalPrice}
                  onChange={(e) => setTempPhysicalPrice(Number(e.target.value))}
                />
              </div>

              <Button
                size="sm"
                onClick={() => {
                  setValue("physicalPrice", Number(tempPhysicalPrice));
                  onEditStart("");
                }}
                className="bg-green-600 hover:bg-green-700"
              >
                <Check className="w-4 h-4" />
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCancel("physical")}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border">
              <span className="font-medium text-gray-900">
                ₹{physicalPrice}
              </span>

              <Button
                size="sm"
                variant="ghost"
                onClick={() => onEditStart("physicalPrice")}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
