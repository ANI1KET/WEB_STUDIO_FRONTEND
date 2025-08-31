"use client";

import {
  // Star,
  Mail,
  Phone,
  Calendar,
  ChevronUp,
  Building2,
  ArrowRight,
  ChevronDown,
  // MessageSquare,
} from "lucide-react";
import React from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import { Lister } from "@/app/types/types";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";

interface ListerHeaderProps {
  lister: Lister;
  roomCount: number;
  isExpanded: boolean;
  // onChatWithLister: () => void;
  onToggleExpanded: () => void;
}

const ListerHeader: React.FC<ListerHeaderProps> = ({
  lister,
  roomCount,
  isExpanded,
  // onChatWithLister,
  onToggleExpanded,
}) => {
  const router = useRouter();

  const handleViewMoreListings = () => {
    router.push(`/lister/${lister.id}/rooms`);
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100 p-4 sm:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
            <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                {lister.name}
              </h3>

              <Badge className="bg-green-100 text-green-800 border-green-200 text-xs sm:text-sm">
                {lister.role}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2">
              <div className="flex items-center gap-1">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4" />

                <span className="truncate">{lister.number}</span>
              </div>

              <div className="flex items-center gap-1">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="truncate">{lister.email}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
              {/* <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" />
                      {lister.ratings}
                    </span> */}

              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                Active since {format(new Date(lister.createdAt), "MMM yyyy")}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-green-700">
              {roomCount}
            </p>

            <p className="text-xs sm:text-sm text-gray-600">saved rooms</p>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleViewMoreListings}
              className="text-green-600 hover:bg-green-50 border-green-300 flex items-center gap-2 text-xs"
            >
              <ArrowRight className="w-3 h-3" />

              <span>View More</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 sm:mt-6 p-3 sm:p-4 bg-white rounded-lg border border-green-100">
        {/* <div className="flex gap-2 sm:gap-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-md">
          <Button
            size="sm"
            variant="outline"
            onClick={onChatWithLister}
            className="text-white shadow-md"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Live Chat
          </Button>
        </div> */}

        <Button
          size="sm"
          variant="ghost"
          onClick={onToggleExpanded}
          className="text-gray-600 hover:bg-gray-100 flex items-center gap-1 text-sm"
        >
          <span>{isExpanded ? "Close up" : "View details"}</span>

          {isExpanded ? (
            <ChevronUp className="w-3 h-3" />
          ) : (
            <ChevronDown className="w-3 h-3" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default ListerHeader;
