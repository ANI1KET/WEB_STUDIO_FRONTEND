"use client";

import React from "react";
import { Permission } from "@prisma/client";
import {
  Edit,
  // ChevronDown, ChevronUp, Crown, Lock
} from "lucide-react";

// import { getServiceBenefits } from "./config/ListingServiceItem";

// import { Badge } from "@/app/components/ui/badge";
import { Switch } from "@/app/components/ui/switch";
import { Button } from "@/app/components/ui/button";

interface Service {
  name: string;
  id: Permission;
  icon: React.ComponentType<{ className?: string }>;
}

interface ListingServiceItemProps {
  service: Service;
  canProvide: boolean;
  isProviding: boolean;
  onEditService: (serviceId: Permission) => void;
  onServiceToggle: (serviceId: Permission, enabled: boolean) => void;
}

const ListingServiceItem = ({
  service,
  // canProvide,
  isProviding,
  onEditService,
  onServiceToggle,
}: ListingServiceItemProps) => {
  const Icon = service.icon;
  // const [showBenefits, setShowBenefits] = useState(false);

  const handleEdit = () => {
    onEditService(service.id);
  };

  const handleServiceToggle = (enabled: boolean) => {
    onServiceToggle(service.id, enabled);
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

    // <div
    //   className={`group relative overflow-hidden flex flex-col p-4 border rounded-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-md ${
    //     canProvide
    //       ? isProviding
    //         ? "border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 shadow-sm"
    //         : "border-gray-200 bg-white hover:border-green-200 hover:bg-green-50"
    //       : "border-gray-300 bg-gray-50 opacity-75"
    //   }`}
    // >
    //   {isProviding && (
    //     <div className="absolute inset-0 bg-gradient-to-r from-green-100/30 to-emerald-100/30 animate-pulse" />
    //   )}

    //   <div className="relative flex items-center justify-between mb-3">
    //     <div className="flex items-center gap-4">
    //       <div
    //         className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
    //           canProvide
    //             ? isProviding
    //               ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg"
    //               : "bg-gradient-to-br from-green-100 to-emerald-100 group-hover:from-green-200 group-hover:to-emerald-200"
    //             : "bg-gray-200"
    //         }`}
    //       >
    //         {canProvide ? (
    //           <Icon
    //             className={`w-6 h-6 transition-all duration-300 ${
    //               isProviding
    //                 ? "text-white"
    //                 : "text-green-600 group-hover:text-green-700"
    //             }`}
    //           />
    //         ) : (
    //           <Lock className="w-6 h-6 text-gray-500" />
    //         )}
    //       </div>

    //       <div>
    //         <div className="flex items-center gap-2 mb-2">
    //           <h4 className="font-semibold text-gray-900 mb-2">
    //             {service.name}
    //           </h4>
    //           {!canProvide && (
    //             <Badge
    //               variant="outline"
    //               className="text-xs bg-amber-50 text-amber-700 border-amber-200"
    //             >
    //               <Crown className="w-3 h-3 mr-1" />
    //               Premium Required
    //             </Badge>
    //           )}
    //         </div>

    //         <div className="flex items-center gap-3">
    //           <div className="flex items-center gap-2">
    //             <Switch
    //               checked={isProviding}
    //               disabled={!canProvide}
    //               onCheckedChange={handleServiceToggle}
    //               className="data-[state=checked]:bg-green-600"
    //             />

    //             <span className="text-sm font-medium text-gray-700">
    //               {canProvide
    //                 ? isProviding
    //                   ? "Providing"
    //                   : "Not Providing"
    //                 : "Upgrade Required"}
    //             </span>
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     {canProvide ? (
    //       isProviding && (
    //         <Button
    //           size="sm"
    //           variant="outline"
    //           onClick={handleEdit}
    //           className="text-blue-600 hover:text-blue-700 border-blue-300 hover:bg-blue-50"
    //         >
    //           <Edit className="w-4 h-4 mr-1" />
    //           Edit
    //         </Button>
    //       )
    //     ) : (
    //       <Button
    //         size="sm"
    //         onClick={() => }
    //         className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
    //       >
    //         <Crown className="w-4 h-4 mr-1" />
    //         Upgrade
    //       </Button>
    //     )}
    //   </div>

    //   {!canProvide && (
    //     <div className="relative mt-3">
    //       <Button
    //         variant="ghost"
    //         onClick={() => setShowBenefits(!showBenefits)}
    //         className="w-full justify-between p-3 h-auto bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border border-green-200 rounded-lg"
    //       >
    //         <div className="flex items-center gap-2">
    //           <Crown className="w-4 h-4 text-green-600" />
    //           <span className="font-semibold text-green-700">
    //             Benefits of Upgrading for {service.name} Service
    //           </span>
    //         </div>
    //         {showBenefits ? (
    //           <ChevronUp className="w-4 h-4 text-green-600" />
    //         ) : (
    //           <ChevronDown className="w-4 h-4 text-green-600" />
    //         )}
    //       </Button>

    //       {showBenefits && (
    //         <div className="mt-3 p-4 bg-gradient-to-r from-green-50/50 to-emerald-50/50 rounded-lg border border-green-200/50 animate-in slide-in-from-top-2 duration-300">
    //           <div className="space-y-2">
    //             {getServiceBenefits(service.id).map((benefit, index) => (
    //               <div key={index} className="flex items-start gap-2">
    //                 <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
    //                 <span className="text-sm text-gray-700 leading-relaxed">
    //                   {benefit}
    //                 </span>
    //               </div>
    //             ))}
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   )}
    // </div>
  );
};

export default ListingServiceItem;
