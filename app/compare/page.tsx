"use client";

import React from "react";
import Link from "next/link";
import { Home, Building, Car } from "lucide-react";

import { useCompareItems } from "./rooms/hooks";

import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";

const CompareOverview = () => {
  const { roomsCount, vehiclesCount, propertiesCount } = useCompareItems();

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow group">
          <CardContent className="p-2 px-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rooms</p>
                <p className="text-3xl font-bold text-blue-600">{roomsCount}</p>
              </div>
              <Home className="w-12 h-12 text-blue-600 opacity-40 group-hover:opacity-80" />
            </div>

            <Link href="/compare/rooms">
              <Button className="w-full mt-4 hover:bg-green-200">
                Compare Rooms
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow group">
          <CardContent className="p-2 px-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Properties</p>
                <p className="text-3xl font-bold text-green-600">
                  {propertiesCount}
                </p>
              </div>
              <Building className="w-12 h-12 text-green-600 opacity-40 group-hover:opacity-80" />
            </div>

            <Link href="/compare/properties">
              <Button className="w-full mt-4 hover:bg-green-200">
                Compare Properties
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow group">
          <CardContent className="p-2 px-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Vehicles</p>
                <p className="text-3xl font-bold text-purple-600">
                  {vehiclesCount}
                </p>
              </div>
              <Car className="w-12 h-12 text-purple-600 opacity-40 group-hover:opacity-80" />
            </div>

            <Link href="/compare/vehicles">
              <Button className="w-full mt-4 hover:bg-green-200">
                Compare Vehicles
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompareOverview;
