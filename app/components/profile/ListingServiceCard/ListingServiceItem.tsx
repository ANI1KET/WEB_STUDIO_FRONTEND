"use client";

import React from "react";
import { Edit } from "lucide-react";
import { Permission } from "@prisma/client";

import { Switch } from "@/app/components/ui/switch";
import { Button } from "@/app/components/ui/button";

interface Service {
  name: string;
  id: Permission;
  icon: React.ComponentType<{ className?: string }>;
}

interface ListingServiceItemProps {
  service: Service;
  isProviding: boolean;
  onEditService: (serviceId: Permission) => void;
  onServiceToggle: (serviceId: Permission, enabled: boolean) => void;
}

const ListingServiceItem = ({
  service,
  isProviding,
  onEditService,
  onServiceToggle,
}: ListingServiceItemProps) => {
  const Icon = service.icon;

  const handleServiceToggle = (enabled: boolean) => {
    onServiceToggle(service.id, enabled);
  };

  const handleEdit = () => {
    onEditService(service.id);
  };

  return (
    <div
      className={`group relative overflow-hidden flex flex-col p-4 border rounded-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-md ${
        isProviding
          ? "border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 shadow-sm"
          : "border-gray-200 bg-white hover:border-green-200 hover:bg-green-50"
      }`}
    >
      {isProviding && (
        <div className="absolute inset-0 bg-gradient-to-r from-green-100/30 to-emerald-100/30 animate-pulse" />
      )}

      <div className="relative flex items-center justify-between mb-3">
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isProviding
                ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg"
                : "bg-gradient-to-br from-green-100 to-emerald-100 group-hover:from-green-200 group-hover:to-emerald-200"
            }`}
          >
            <Icon
              className={`w-6 h-6 transition-all duration-300 ${
                isProviding
                  ? "text-white"
                  : "text-green-600 group-hover:text-green-700"
              }`}
            />
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">{service.name}</h4>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Switch
                  checked={isProviding}
                  onCheckedChange={handleServiceToggle}
                  className="data-[state=checked]:bg-green-600"
                />

                <span className="text-sm font-medium text-gray-700">
                  {isProviding ? "Providing" : "Not Providing"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {isProviding && (
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

export default ListingServiceItem;
