"use client";

import React from "react";
import { Video, MapPin, Clock, Users, CheckCircle } from "lucide-react";

import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent } from "@/app/components/ui/card";

interface VisitTypeSelectionProps {
  visitType: "physical" | "virtual";
  onVisitTypeChange: (type: "physical" | "virtual") => void;
}

export const VisitTypeSelection: React.FC<VisitTypeSelectionProps> = ({
  visitType,
  onVisitTypeChange,
}) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <Users className="h-5 w-5 text-green-600" />
        Choose Your Visit Type
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Physical Visit */}
        <Card
          className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
            visitType === "physical"
              ? "border-2 border-green-500 bg-green-50/50"
              : "border border-gray-200 hover:border-green-300"
          }`}
          onClick={() => onVisitTypeChange("physical")}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    visitType === "physical" ? "bg-green-600" : "bg-gray-400"
                  }`}
                >
                  <MapPin className="h-5 w-5 text-white" />
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900">
                    Physical Visit
                  </h4>

                  <p className="text-sm text-gray-600">
                    In-person room inspection
                  </p>
                </div>
              </div>

              {visitType === "physical" && (
                <CheckCircle className="h-5 w-5 text-green-600" />
              )}
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>45-60 minutes duration</span>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  Full Price
                </Badge>
                <span>Complete room experience</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Virtual Visit */}
        <Card
          className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
            visitType === "virtual"
              ? "border-2 border-blue-500 bg-blue-50/50"
              : "border border-gray-200 hover:border-blue-300"
          }`}
          onClick={() => onVisitTypeChange("virtual")}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    visitType === "virtual" ? "bg-blue-600" : "bg-gray-400"
                  }`}
                >
                  <Video className="h-5 w-5 text-white" />
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900">Virtual Visit</h4>
                  <p className="text-sm text-gray-600">Live video tour</p>
                </div>
              </div>

              {visitType === "virtual" && (
                <CheckCircle className="h-5 w-5 text-blue-600" />
              )}
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>20-30 minutes duration</span>
              </div>

              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="text-xs bg-green-50 text-green-700"
                >
                  70% Off
                </Badge>
                <span>Convenient & quick</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
