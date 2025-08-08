"use client";

import React, { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { MapPin, Plus, X, Check } from "lucide-react";

import { ServiceData } from "../types/ListingServiceCard";
import { nepalCityOptions } from "@/app/common/config/nepal";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Combobox } from "@/app/components/ui/combobox";

interface CitiesSectionProps {
  editingField: string | null;
  onEditStart: (field: string) => void;
  setValue: UseFormSetValue<ServiceData>;
  cities: { city: string; locations: string[] }[];
}

const CitiesSection = ({
  cities,
  setValue,
  onEditStart,
  editingField,
}: CitiesSectionProps) => {
  const [selectedCity, setSelectedCity] = useState("");

  const handleAdd = () => {
    const trimmedCity = selectedCity.trim();
    const alreadyExists = cities.some((c) => c.city === trimmedCity);

    if (trimmedCity && !alreadyExists) {
      setValue("supportedCities", [
        ...cities,
        { city: trimmedCity, locations: [] },
      ]);
      setSelectedCity("");
      onEditStart("");
    }
  };

  const handleCityRemove = (city: string) => {
    setValue(
      "supportedCities",
      cities.filter((c) => c.city !== city)
    );
  };

  const handleCancel = () => {
    setSelectedCity("");
    onEditStart("");
  };

  const handleCitySelect = (cityValue: string) => {
    setSelectedCity(cityValue);
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-blue-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />

          <h3 className="text-lg font-semibold text-gray-900">
            Cities Serviced
          </h3>
        </div>

        {editingField !== "cities" && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEditStart("cities")}
            className="text-blue-600 hover:text-blue-700 border-blue-300 hover:bg-blue-50"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add City
          </Button>
        )}
      </div>

      {editingField === "cities" && (
        <div className="flex gap-2 mb-4">
          <div className="flex-1">
            <Combobox
              className="w-full"
              allowCustom={true}
              value={selectedCity}
              options={nepalCityOptions}
              onValueChange={handleCitySelect}
              placeholder="Select or type a city..."
            />
          </div>

          <Button
            size="sm"
            onClick={handleAdd}
            className="bg-green-600 hover:bg-green-700"
          >
            <Check className="w-4 h-4" />
          </Button>

          <Button size="sm" variant="outline" onClick={handleCancel}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {cities.length > 0 ? (
          cities.map((cityData, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center gap-1 py-1 px-3 bg-green-100 text-green-800 hover:bg-green-200"
            >
              {cityData.city}
              <button
                onClick={() => handleCityRemove(cityData.city)}
                className="ml-1 hover:text-red-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))
        ) : (
          <p className="text-gray-500 text-sm italic">No cities added yet</p>
        )}
      </div>
    </div>
  );
};

export default CitiesSection;
