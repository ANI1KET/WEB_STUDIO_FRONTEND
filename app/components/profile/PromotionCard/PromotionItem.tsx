"use client";

import React from "react";
import { Permission } from "@prisma/client";
import {
  Edit,
  // ChevronDown, ChevronUp, Crown, Lock,
} from "lucide-react";

// import { getPromotionBenefits } from "./config/PromotionItem";

// import { Badge } from "@/app/components/ui/badge";
import { Switch } from "@/app/components/ui/switch";
import { Button } from "@/app/components/ui/button";

interface Promotion {
  name: string;
  id: Permission;
  icon: React.ComponentType<{ className?: string }>;
}

interface PromotionItemProps {
  canPromote: boolean;
  promotion: Promotion;
  isPromoting: boolean;
  onEditPromotion: (permissionId: Permission) => void;
  onPromotionToggle: (permissionId: Permission, enabled: boolean) => void;
}

const PromotionItem = ({
  promotion,
  // canPromote,
  isPromoting,
  onEditPromotion,
  onPromotionToggle,
}: PromotionItemProps) => {
  const Icon = promotion.icon;
  // const [showBenefits, setShowBenefits] = useState(false);

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

    // <div
    //   className={`group relative overflow-hidden flex flex-col p-4 border rounded-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-md ${
    //     canPromote
    //       ? isPromoting
    //         ? "border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 shadow-sm"
    //         : "border-gray-200 bg-white hover:border-green-200 hover:bg-green-50"
    //       : "border-gray-300 bg-gray-50 opacity-75"
    //   }`}
    // >
    //   {isPromoting && (
    //     <div className="absolute inset-0 bg-gradient-to-r from-green-100/30 to-emerald-100/30 animate-pulse" />
    //   )}

    //   <div className="relative flex items-center justify-between">
    //     <div className="flex items-center gap-4">
    //       <div
    //         className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
    //           canPromote
    //             ? isPromoting
    //               ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg"
    //               : "bg-gradient-to-br from-green-100 to-emerald-100 group-hover:from-green-200 group-hover:to-emerald-200"
    //             : "bg-gray-200"
    //         }`}
    //       >
    //         {canPromote ? (
    //           <Icon
    //             className={`w-6 h-6 transition-all duration-300 ${
    //               isPromoting
    //                 ? "text-white"
    //                 : "text-green-600 group-hover:text-green-700"
    //             }`}
    //           />
    //         ) : (
    //           <Lock className="w-6 h-6 text-gray-500" />
    //         )}
    //       </div>

    //       <div className="flex-1">
    //         <div className="flex items-center gap-2 mb-2">
    //           <h4 className="font-semibold text-gray-900 mb-2">
    //             {promotion.name}
    //           </h4>
    //           {!canPromote && (
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
    //               checked={isPromoting}
    //               disabled={!canPromote}
    //               onCheckedChange={handlePromotionToggle}
    //               className="data-[state=checked]:bg-green-600"
    //             />
    //             <span className="text-sm font-medium text-gray-700">
    //               {canPromote
    //                 ? isPromoting
    //                   ? "Promoting"
    //                   : "Not Promoting"
    //                 : "Upgrade Required"}
    //             </span>
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     {canPromote ? (
    //       isPromoting && (
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
    //         className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
    //       >
    //         <Crown className="w-4 h-4 mr-1" />
    //         Upgrade
    //       </Button>
    //     )}
    //   </div>

    //   {!canPromote && (
    //     <div className="relative mt-3">
    //       <Button
    //         variant="ghost"
    //         onClick={() => setShowBenefits(!showBenefits)}
    //         className="w-full justify-between p-3 h-auto bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border border-green-200 rounded-lg"
    //       >
    //         <div className="flex items-center gap-2">
    //           <Crown className="w-4 h-4 text-green-600" />

    //           <span className="font-semibold text-green-700">
    //             Benefits of Upgrading for {promotion.name} Promotion
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
    //             {getPromotionBenefits(promotion.id).map((benefit, index) => (
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

export default PromotionItem;
