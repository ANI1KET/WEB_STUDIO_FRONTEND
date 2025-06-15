"use client";

import { memo } from "react";

import { Button } from "@/app/components/ui/button";

interface RoomCitySelectorProps {
  cities: string[];
  activeCity: string;
  handleCityChange: (city: string) => void;
}

const RoomCitySelector = memo(
  ({ cities, activeCity, handleCityChange }: RoomCitySelectorProps) => {
    return (
      <div className="backdrop-blur-sm bg-gradient-to-r from-white/60 to-green-50/40 p-5 sm:p-8 md:p-10 rounded-xl mb-8 shadow-2xl border border-white/40">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-900">
            <span className="bg-gradient-to-r from-green-900 to-green-700 bg-clip-text text-transparent">
              Rooms
            </span>
          </h2>

          <Button
            variant="link"
            className="text-green-700 hover:text-green-800 group"
          >
            View All
            <span className="ml-1 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Button>
        </div>

        <div className="overflow-x-auto">
          <div className="flex gap-2 sm:gap-4 mb-4 sm:mb-6 min-w-max">
            {cities.map((city, index) => (
              <Button
                key={index}
                asChild={true}
                variant={"outline"}
                className={`px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base ${
                  city === activeCity
                    ? "bg-green-600 text-white shadow-lg shadow-green-700/30 border-green-600/80"
                    : "border-green-600/30 hover:border-green-600/80 text-green-800"
                }`}
                onClick={() => handleCityChange(city)}
              >
                {city}
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

RoomCitySelector.displayName = "RoomCitySelector";
export default RoomCitySelector;
