"use client";

import React from "react";
import { Users, Building2, TrendingUp } from "lucide-react";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/app/components/ui/card";

interface RoomsAnalyticsProps {
  totalRooms: number;
  totalListers: number;
  ownerListers: number;
  brokerListers: number;
  averageRoomsPerLister: string;
}

const RoomsAnalytics: React.FC<RoomsAnalyticsProps> = ({
  totalRooms,
  totalListers,
  ownerListers,
  brokerListers,
  averageRoomsPerLister,
}) => {
  const analytics = [
    {
      icon: Users,
      title: "Total Listers",
      value: totalListers.toString(),
      description: `${brokerListers} brokers, ${ownerListers} owners`,
    },
    {
      icon: Building2,
      title: "Rooms Interested",
      value: totalRooms.toString(),
      description: `${averageRoomsPerLister} avg per lister`,
    },
  ];

  if (totalListers === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-semibold text-foreground">
          Interest Analytics
        </h2>
        <span className="text-sm text-muted-foreground">
          Real-time insights
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {analytics.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.title}
              className="relative overflow-hidden hover:shadow-md group border-0 bg-gradient-to-r from-green-50 to-emerald-50 backdrop-blur-sm"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>

                <Icon className="h-4 w-4 group-hover:scale-110 transition-all duration-300" />
              </CardHeader>

              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>

                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs truncate flex-1">{item.description}</p>
                </div>
              </CardContent>

              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default RoomsAnalytics;
