"use client";

import React from "react";
import { Edit } from "lucide-react";
import { Permission } from "@prisma/client";

import { Switch } from "@/app/components/ui/switch";
import { Button } from "@/app/components/ui/button";

interface Promotion {
  name: string;
  id: Permission;
  icon: React.ComponentType<{ className?: string }>;
}

interface PromotionItemProps {
  promotion: Promotion;
  isPromoting: boolean;
  onEditPromotion: (permissionId: Permission) => void;
  onPromotionToggle: (permissionId: Permission, enabled: boolean) => void;
}

const PromotionItem = ({
  promotion,
  isPromoting,
  onEditPromotion,
  onPromotionToggle,
}: PromotionItemProps) => {
  const Icon = promotion.icon;

  const handlePromotionToggle = (enabled: boolean) => {
    onPromotionToggle(promotion.id, enabled);
  };

  const handleEdit = () => {
    onEditPromotion(promotion.id);
  };

  return (
    <div
      className={`group relative overflow-hidden flex flex-col p-4 border rounded-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-md ${
        isPromoting
          ? "border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 shadow-sm"
          : "border-gray-200 bg-white hover:border-green-200 hover:bg-green-50"
      }`}
    >
      {isPromoting && (
        <div className="absolute inset-0 bg-gradient-to-r from-green-100/30 to-emerald-100/30 animate-pulse" />
      )}

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isPromoting
                ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg"
                : "bg-gradient-to-br from-green-100 to-emerald-100 group-hover:from-green-200 group-hover:to-emerald-200"
            }`}
          >
            <Icon
              className={`w-6 h-6 transition-all duration-300 ${
                isPromoting
                  ? "text-white"
                  : "text-green-600 group-hover:text-green-700"
              }`}
            />
          </div>

          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-2">
              {promotion.name}
            </h4>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Switch
                  checked={isPromoting}
                  onCheckedChange={handlePromotionToggle}
                  className="data-[state=checked]:bg-green-600"
                />
                <span className="text-sm font-medium text-gray-700">
                  {isPromoting ? "Promoting" : "Not Promoting"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* {isPromoting && currentPromotion.price > 0 && ( */}
        {isPromoting && (
          <Button
            size="sm"
            variant="outline"
            onClick={handleEdit}
            className="text-blue-600 hover:text-blue-700 border-blue-300 hover:bg-blue-50"
          >
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
        )}
      </div>
    </div>
  );
};

export default PromotionItem;
