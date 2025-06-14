"use client";

import { toast } from "sonner";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Permission } from "@prisma/client";
import { useState, useEffect } from "react";

import { PropertyType } from "@/app/types/types";
import { propertyTypes, categorySearchData } from "./config/SmartSearch";

import {
  FetchCategoryCityLocations,
  FetchCategoryCitiesLocations,
} from "./hooks/SmartSearch";

const CategorySelector = dynamic(
  () => import("./SmartSearch/CategorySelector")
);
const LocationSelector = dynamic(
  () => import("./SmartSearch/LocationSelector")
);
const SmartSearchHeader = dynamic(
  () => import("./SmartSearch/SmartSearchHeader")
);
const PropertyTypeSelector = dynamic(
  () => import("./SmartSearch/PropertyTypeSelector")
);
const CitySelector = dynamic(() => import("./SmartSearch/CitySelector"));
const SearchButton = dynamic(() => import("./SmartSearch/SearchButton"));
const FilterToggle = dynamic(() => import("./SmartSearch/FilterToggle"));
const SearchFilters = dynamic(() => import("./SmartSearch/SearchFilters"));

const SmartSearch = () => {
  const router = useRouter();

  const [category, setCategory] = useState<Permission | "">("");

  const [selectedCity, setSelectedCity] = useState<string>("");

  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const [showPropertyType, setShowPropertyType] = useState(false);
  const [propertyType, setPropertyType] = useState<PropertyType | "">("");

  const [showFilters, setShowFilters] = useState(false);

  const {
    data: CitiesLocations,
    error: CitiesLocationsError,
    isError: isCitiesLocationsError,
  } = FetchCategoryCitiesLocations(category || "room", selectedCity);
  if (isCitiesLocationsError) {
    console.log(CitiesLocationsError.message);
  }

  const {
    // error,
    // isError,
    // isPending,
    mutate: reFetchCityLocations,
  } = FetchCategoryCityLocations();

  useEffect(() => {
    if (propertyType === "House") {
      categorySearchData["property"]({
        propertyType,
        plotWidth: undefined,
        plotLength: undefined,
      });
    } else if (propertyType === "Land") {
      categorySearchData["property"]({
        propertyType,
        builtUpArea: undefined,
        // amenities:[],
        // floors: undefined,
        // bedrooms: undefined,
        // kitchens: undefined,
        // bathrooms: undefined,
      });
    }
  }, [propertyType]);

  useEffect(() => {
    if (category) {
      // setSelectedCity("");
      setSelectedLocations([]);

      setShowPropertyType(category === "property");
      if (category !== "property") {
        setPropertyType("");
      }
    }
  }, [category]);

  const handleCategoryChange = (value: Permission) => {
    setCategory(value);
    setShowFilters(false);
  };

  const handleCityChange = (value: string) => {
    if (CitiesLocations?.[value]?.length == 0)
      reFetchCityLocations({ city: value, category });

    setSelectedCity(value);
    setSelectedLocations([]);
  };

  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((loc) => loc !== location)
        : [...prev, location]
    );
  };

  const handleSearch = () => {
    if (!category) {
      toast.error("Select a category");
      return;
    }

    if (!selectedCity) {
      toast.error("Select a city");
      return;
    }

    if (category === "property" && !propertyType) {
      toast.error("Select a property type");
      return;
    }

    categorySearchData[category]({
      city: selectedCity,
      locations: selectedLocations,
    });

    router.push(`/search/${category}`);
  };

  return (
    <div className="relative w-full mx-auto max-w-3xl ">
      <div className="w-full rounded-2xl mx-auto border border-gray-100 shadow-lg overflow-hidden bg-white">
        <div className="p-2 md:p-3">
          <SmartSearchHeader />

          <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <CategorySelector
                category={category}
                onCategoryChange={handleCategoryChange}
              />

              <CitySelector
                selectedCity={selectedCity}
                selectedCategory={category}
                handleCityChange={handleCityChange}
                availableCities={
                  CitiesLocations ? Object.keys(CitiesLocations) : []
                }
              />
            </div>

            {showPropertyType ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <PropertyTypeSelector
                  propertyType={propertyType}
                  setPropertyType={setPropertyType}
                  propertyTypeOptions={propertyTypes}
                />

                <LocationSelector
                  disabled={!category}
                  selectedCity={selectedCity}
                  toggleLocation={toggleLocation}
                  selectedLocations={selectedLocations}
                  availableLocations={CitiesLocations?.[selectedCity] ?? []}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                <LocationSelector
                  disabled={!category}
                  selectedCity={selectedCity}
                  toggleLocation={toggleLocation}
                  selectedLocations={selectedLocations}
                  availableLocations={CitiesLocations?.[selectedCity] ?? []}
                />
              </div>
            )}

            <FilterToggle
              showFilters={showFilters}
              setShowFilters={setShowFilters}
            />

            {showFilters && (
              <SearchFilters
                category={category}
                propertyTypeExist={!!propertyType}
              />
            )}

            <SearchButton category={category} onClick={handleSearch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartSearch;
