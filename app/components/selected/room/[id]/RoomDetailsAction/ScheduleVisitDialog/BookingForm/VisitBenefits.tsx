"use client";

import {
  Bed,
  Eye,
  Zap,
  Wifi,
  Video,
  Clock,
  MapPin,
  Shield,
  Camera,
  Droplets,
  Utensils,
  CheckCircle,
} from "lucide-react";
import React from "react";

import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent } from "@/app/components/ui/card";

interface VisitBenefitsProps {
  visitType: "physical" | "virtual";
}

export const VisitBenefits: React.FC<VisitBenefitsProps> = ({ visitType }) => {
  const physicalBenefits = [
    {
      icon: Eye,
      color: "text-blue-600",
      title: "Inspect Room Condition",
      description:
        "Check walls, flooring, ceiling for cracks, dampness, or damage",
    },
    {
      icon: Droplets,
      color: "text-cyan-600",
      title: "Test Water & Plumbing",
      description:
        "Verify water pressure, tap functionality, drainage in bathroom & kitchen",
    },
    {
      icon: Utensils,
      color: "text-orange-600",
      title: "Kitchen Appliances Check",
      description:
        "Test gas stove, chimney, sink, basin, and storage functionality",
    },
    {
      icon: Bed,
      color: "text-green-600",
      title: "Bedroom & Living Space",
      description:
        "Check ventilation, natural light, storage space, and room dimensions",
    },
    {
      icon: Shield,
      color: "text-red-600",
      title: "Safety & Security",
      description:
        "Inspect locks, security systems, fire safety, and building maintenance",
    },
    {
      icon: Wifi,
      color: "text-purple-600",
      title: "Connectivity Test",
      description:
        "Check mobile network, WiFi coverage, and internet speed in all areas",
    },
  ];

  const virtualBenefits = [
    {
      icon: Video,
      color: "text-blue-600",
      title: "Live HD Video Tour",
      description:
        "High-quality video walkthrough of entire room and common areas",
    },
    {
      icon: Camera,
      color: "text-green-600",
      title: "Interactive Q&A",
      description: "Ask questions in real-time and get instant clarifications",
    },
    {
      icon: Clock,
      title: "Time Efficient",
      color: "text-orange-600",
      description:
        "Quick 20-30 minute tour without travel time or traffic hassles",
    },
    {
      icon: Zap,
      color: "text-purple-600",
      title: "Instant Booking",
      description: "Book immediately if satisfied, with digital documentation",
    },
  ];

  const benefits =
    visitType === "physical" ? physicalBenefits : virtualBenefits;

  return (
    <Card
      className={`${
        visitType === "physical"
          ? "border-green-200 bg-gradient-to-br from-green-50 to-emerald-50"
          : "border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50"
      }`}
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          {visitType === "physical" ? (
            <MapPin className="h-6 w-6 text-green-600" />
          ) : (
            <Video className="h-6 w-6 text-blue-600" />
          )}
          <h3 className="text-lg font-semibold text-gray-900">
            {visitType === "physical" ? "Physical Visit" : "Virtual Visit"}{" "}
            Benefits
          </h3>
          <Badge
            className={`${
              visitType === "physical"
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {visitType === "physical" ? "Comprehensive" : "Convenient"}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-white/60 rounded-lg"
              >
                <div className={`p-2 rounded-lg bg-white shadow-sm`}>
                  <IconComponent className={`h-5 w-5 ${benefit.color}`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">
                    {benefit.title}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
                <CheckCircle
                  className={`h-4 w-4 mt-1 ${
                    visitType === "physical"
                      ? "text-green-500"
                      : "text-blue-500"
                  }`}
                />
              </div>
            );
          })}
        </div>

        {visitType === "physical" && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center gap-2 text-amber-800">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">Pro Tip:</span>
            </div>
            <p className="text-xs text-amber-700 mt-1">
              Take photos during your visit and check room condition during
              different times of day if possible. Test all appliances, switches,
              and water taps thoroughly before making a decision.
            </p>
          </div>
        )}

        {visitType === "virtual" && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 text-blue-800">
              <Video className="h-4 w-4" />
              <span className="text-sm font-medium">What to Expect:</span>
            </div>
            <p className="text-xs text-blue-700 mt-1">
              High-definition live tour with screen sharing, ability to ask for
              close-ups of specific areas, and instant answers to all your
              questions about amenities and neighborhood.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
