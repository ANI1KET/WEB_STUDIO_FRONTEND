"use client";

import React from "react";
import { Permission } from "@prisma/client";
import { Home, Building, Car, Check, Shield, LucideProps } from "lucide-react";

interface PermissionsCardProps {
  userPermissions: Permission[];
}

const PermissionsCard = ({ userPermissions }: PermissionsCardProps) => {
  const permissions: Record<
    Permission,
    {
      id: string;
      name: string;
      icon: React.ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
      >;
    }
  > = {
    room: {
      id: "room",
      icon: Home,
      name: "Room Listings",
    },
    property: {
      id: "property",
      icon: Building,
      name: "Property Listings",
    },
    vehicle: {
      icon: Car,
      id: "vehicle",
      name: "Vehicle Listings",
    },

    //----------//

    hostel: {
      icon: Car,
      id: "hostel",
      name: "Hostel Listings",
    },
    reMarketItem: {
      icon: Car,
      id: "vehicle",
      name: "Vehicle Listings",
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-green-200 p-4 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
          <Shield className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
          Permissions & Access
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {userPermissions.map((permission) => {
          const id = permissions[permission].id;
          const name = permissions[permission].name;
          const Icon = permissions[permission].icon;
          return (
            <div
              key={id}
              className={
                "group flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-md bg-gradient-to-r from-green-100 to-emerald-100 border-green-300 shadow-sm"
              }
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${"bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg"}`}
              >
                <Icon
                  className={`w-5 h-5 transition-all duration-300 ${"text-white"}`}
                />
              </div>

              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-sm">{name}</h4>
              </div>

              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${"bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg"}`}
              >
                <Check className="w-3 h-3 text-white" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PermissionsCard;
