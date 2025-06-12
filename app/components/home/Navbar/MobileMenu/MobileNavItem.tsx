"use client";

import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

import { Button } from "@/app/components/ui/button";

interface MobileNavItemProps {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  description?: string;
}

const MobileNavItem = ({
  icon,
  label,
  onClick,
  description,
}: MobileNavItemProps) => {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className="w-full justify-between text-left bg-white/80 hover:bg-white/90 border border-green-200 hover:border-green-300 rounded-xl p-4 h-auto transition-all duration-200 group shadow-sm hover:shadow-md"
    >
      <div className="flex items-center flex-1">
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-200 group-hover:from-green-200 group-hover:to-emerald-200">
          {icon}
        </div>
        <div className="text-left flex-1">
          <div className="font-medium text-gray-800 group-hover:text-green-700 text-base">
            {label}
          </div>
          {description && (
            <div className="text-sm text-gray-500 mt-1 group-hover:text-green-600">
              {description}
            </div>
          )}
        </div>
      </div>
      <ChevronRight
        size={18}
        className="text-green-500 group-hover:text-green-600 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0"
      />
    </Button>
  );
};

export default MobileNavItem;
