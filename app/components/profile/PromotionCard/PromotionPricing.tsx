"use client";

import { Check, X, Mouse } from "lucide-react";
import React, { useState, useEffect } from "react";

import { Permission } from "@prisma/client";

import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

interface PromotionPricingProps {
  onCancel: () => void;
  currentPrice: number;
  permissionName: string;
  permissionId: Permission;
  isPromotionExist: boolean;
  onConfirm: (permissionId: Permission, price: number) => void;
}

const PromotionPricing = ({
  onCancel,
  onConfirm,
  currentPrice,
  permissionId,
  permissionName,
  isPromotionExist,
}: PromotionPricingProps) => {
  const [price, setPrice] = useState(currentPrice);

  useEffect(() => {
    setPrice(currentPrice);
  }, [currentPrice]);

  const handleConfirm = () => {
    onConfirm(permissionId, price);
  };

  return (
    <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <Mouse className="w-5 h-5 text-green-600" />
        <h4 className="font-semibold text-green-900">
          {isPromotionExist ? "Update" : "Set"} Promotion Price for{" "}
          {permissionName}
        </h4>
      </div>

      {isPromotionExist && (
        <div className="mb-3 p-2 bg-gradient-to-r from-green-300 to-emerald-300 border-green-500 rounded text-sm">
          Current price: NPR {currentPrice}/click
        </div>
      )}

      <div className="space-y-3">
        <div>
          <Label
            htmlFor="promotion-price"
            className="text-sm font-medium text-gray-700"
          >
            Per Click Price (NPR)
          </Label>

          <Input
            min="0"
            value={price}
            type="number"
            className="mt-1"
            id="promotion-price"
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleConfirm}
            disabled={isNaN(price) || price <= 0}
            className="border-gray-800 flex-1"
          >
            <Check className="w-4 h-4 mr-1" />
            {isPromotionExist ? "Update" : "Confirm"} (NPR {price}/click)
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={onCancel}
            className="border-gray-800"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PromotionPricing;
