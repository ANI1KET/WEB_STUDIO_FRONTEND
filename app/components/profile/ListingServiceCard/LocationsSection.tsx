"use client";

import { MapPin, Plus, X } from "lucide-react";
import React, { useState, useMemo } from "react";
import { UseFormSetValue } from "react-hook-form";

import { ServiceData } from "../types/ListingServiceCard";

import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";

interface LocationsSectionProps {
  editingField: string | null;
  onEditStart: (field: string) => void;
  setValue: UseFormSetValue<ServiceData>;
  supportedCities: { city: string; locations: string[] }[];
}

const LocationsSection = ({
  setValue,
  onEditStart,
  editingField,
  supportedCities,
}: LocationsSectionProps) => {
  const [newLocations, setNewLocations] = useState<{
    [cityName: string]: string;
  }>({});

  const handleAddLocation = (city: string) => {
    const location = newLocations[city]?.trim();
    if (!location) return;

    if (location) {
      const updatedCities = supportedCities.map((c) => {
        if (c.city === city && !c.locations.includes(location)) {
          return {
            ...c,
            locations: [...c.locations, location],
          };
        }
        return c;
      });

      setValue("supportedCities", updatedCities);
      setNewLocations((prev) => ({ ...prev, [city]: "" }));
    }
  };

  const handleLocationChange = (city: string, value: string) => {
    setNewLocations((prev) => ({ ...prev, [city]: value }));
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    city: string
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddLocation(city);
    }
  };

  const handleRemoveLocation = (city: string, location: string) => {
    const updatedCities = supportedCities.map((c) => {
      if (c.city === city) {
        return {
          ...c,
          locations: c.locations.filter((loc) => loc !== location),
        };
      }
      return c;
    });

    setValue("supportedCities", updatedCities);
  };

  const totalLocations = useMemo(() => {
    return supportedCities.reduce(
      (acc, city) => acc + city.locations.length,
      0
    );
  }, [supportedCities]);

  return (
    <div className="bg-white rounded-lg p-4 border border-green-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Office Locations ({totalLocations})
          </h3>
        </div>

        {editingField !== "locations" && supportedCities.length > 0 && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEditStart("locations")}
            className="text-green-600 hover:text-green-700 border-green-300 hover:bg-green-50"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Location
          </Button>
        )}
      </div>

      {supportedCities.length === 0 && (
        <p className="text-gray-500 text-sm italic">
          Add cities first to manage locations
        </p>
      )}

      {editingField === "locations" && supportedCities.length > 0 && (
        <div className="space-y-4 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Add Locations</Label>

            <Button
              size="sm"
              variant="outline"
              onClick={() => onEditStart("")}
              className="text-gray-600 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {supportedCities.map((cityData) => (
            <div key={cityData.city} className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                {cityData.city}
              </Label>

              <div className="flex gap-2">
                <Input
                  className="flex-1"
                  value={newLocations[cityData.city] || ""}
                  onKeyDown={(e) => handleKeyPress(e, cityData.city)}
                  placeholder={`Add location in ${cityData.city}...`}
                  onChange={(e) =>
                    handleLocationChange(cityData.city, e.target.value)
                  }
                />

                <Button
                  size="sm"
                  disabled={!newLocations[cityData.city]?.trim()}
                  onClick={() => handleAddLocation(cityData.city)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-4">
        {supportedCities.map((cityData) => {
          const city = cityData.city;
          const locations = cityData.locations;
          const needsLocation = locations.length === 0;
          return (
            <div
              key={city}
              className={`border rounded-lg p-3 ${
                needsLocation ? "border-red-200 bg-red-50" : "border-gray-200"
              }`}
            >
              <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                <MapPin
                  className={`w-4 h-4 ${
                    needsLocation ? "text-red-600" : "text-blue-600"
                  }`}
                />
                {city}

                <span className="text-sm text-gray-500">
                  ({locations.length} locations)
                </span>

                {needsLocation && (
                  <Badge variant="destructive" className="text-xs">
                    Required
                  </Badge>
                )}
              </h4>

              <div className="flex flex-wrap gap-2">
                {locations.length > 0 ? (
                  locations.map((location, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1 py-1 px-3 bg-blue-100 text-blue-800 hover:bg-blue-200"
                    >
                      {location}
                      <button
                        onClick={() => handleRemoveLocation(city, location)}
                        className="ml-1 hover:text-red-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm italic">
                    No locations added for {city}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LocationsSection;
