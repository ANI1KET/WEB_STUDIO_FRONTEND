import React from "react";
import Link from "next/link";
import { Home, Building, Car, ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/app/components/ui/card";

const CategoryCards: React.FC = () => {
  const categories = [
    {
      icon: Home,
      title: "Rooms",
      route: "/interested/rooms",
      description: "Rooms & Flats",
    },
    {
      icon: Building,
      title: "Properties",
      route: "/interested/properties",
      description: "Houses, Plots & Lands",
    },
    {
      icon: Car,
      title: "Vehicles",
      route: "/interested/vehicles",
      description: "Cars, Bikes & Commercial vehicles",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      {categories.map((category, index) => {
        const Icon = category.icon;

        return (
          <Card
            key={index}
            className="bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 group"
          >
            <CardContent className="px-6 py-4">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center group-hover:bg-green-500 transition-colors duration-300">
                <Icon className="w-7 h-7 text-green-500 group-hover:text-white transition-colors duration-300" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900">
                  {category.title}
                </h3>

                <p className="text-gray-600 text-sm">{category.description}</p>
              </div>

              <Link
                href={category.route}
                className="flex items-center justify-center gap-2 mt-2 py-2 bg-green-200 group-hover:bg-green-500 rounded-md font-medium transition-colors whitespace-nowrap"
              >
                <span>View {category.title}</span>

                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-all duration-300" />
              </Link>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default CategoryCards;
