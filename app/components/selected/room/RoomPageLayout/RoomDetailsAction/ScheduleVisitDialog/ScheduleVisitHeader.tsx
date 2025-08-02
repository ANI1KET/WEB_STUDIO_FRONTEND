"use client";

import React from "react";
import { MapPin, Video, IndianRupee } from "lucide-react";

import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent } from "@/app/components/ui/card";

interface ScheduleVisitHeaderProps {
  roomTitle: string;
  visitPrice: number;
  visitType?: "physical" | "virtual";
}

export const ScheduleVisitHeader: React.FC<ScheduleVisitHeaderProps> = ({
  roomTitle,
  visitPrice,
  visitType = "physical",
}) => {
  return (
    <Card
      className={`border-2 ${
        visitType === "physical"
          ? "border-green-200 bg-gradient-to-r from-green-50 to-emerald-50"
          : "border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50"
      }`}
    >
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div
              className={`p-3 rounded-xl shadow-lg ${
                visitType === "physical"
                  ? "bg-gradient-to-br from-green-500 to-green-600"
                  : "bg-gradient-to-br from-blue-500 to-blue-600"
              }`}
            >
              {visitType === "physical" ? (
                <MapPin className="h-6 w-6 text-white" />
              ) : (
                <Video className="h-6 w-6 text-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className={`font-bold text-lg sm:text-xl mb-1 ${
                  visitType === "physical" ? "text-green-900" : "text-blue-900"
                }`}
              >
                {roomTitle}
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  className={`${
                    visitType === "physical"
                      ? "bg-green-100 text-green-800 border-green-200"
                      : "bg-blue-100 text-blue-800 border-blue-200"
                  }`}
                >
                  {visitType === "physical" ? "Physical Visit" : "Virtual Tour"}
                </Badge>
                {visitType === "virtual" && (
                  <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                    70% Discount
                  </Badge>
                )}
              </div>
              <p
                className={`text-sm mt-1 ${
                  visitType === "physical" ? "text-green-700" : "text-blue-700"
                }`}
              >
                {visitType === "physical"
                  ? "Complete in-person room inspection and tour"
                  : "Live HD video tour with interactive Q&A"}
              </p>
            </div>
          </div>

          <div className="text-center sm:text-right">
            <div className="flex items-center gap-1 justify-center sm:justify-end">
              <IndianRupee
                className={`h-6 w-6 ${
                  visitType === "physical" ? "text-green-600" : "text-blue-600"
                }`}
              />
              <span
                className={`text-2xl sm:text-3xl font-bold ${
                  visitType === "physical" ? "text-green-600" : "text-blue-600"
                }`}
              >
                {visitPrice.toLocaleString()}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {visitType === "physical" ? "45-60 min visit" : "20-30 min tour"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
