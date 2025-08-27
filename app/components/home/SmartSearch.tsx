"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import {
  FetchCategoryCityLocations,
  FetchCategoryCitiesLocations,
} from "./hooks/SmartSearch";
import { useToast } from "@/app/common/hooks/use-toast";
import { Category, categorySearchData } from "./config/SmartSearch";

const CategorySelector = dynamic(
  () => import("./SmartSearch/CategorySelector")
);
const LocationSelector = dynamic(
  () => import("./SmartSearch/LocationSelector")
);
const SmartSearchHeader = dynamic(
  () => import("./SmartSearch/SmartSearchHeader")
);
const CitySelector = dynamic(() => import("./SmartSearch/CitySelector"));
const SearchButton = dynamic(() => import("./SmartSearch/SearchButton"));
const FilterToggle = dynamic(() => import("./SmartSearch/FilterToggle"));
const SearchFilters = dynamic(() => import("./SmartSearch/SearchFilters"));

const SmartSearch = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [showFilters, setShowFilters] = useState(false);
  const [category, setCategory] = useState<Category | "">("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

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
    if (category) {
      // setSelectedCity("");
      setSelectedLocations([]);
    }
  }, [category]);

  const handleCategoryChange = (value: Category) => {
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
      toast({
        title: "Search",
        variant: "destructive",
        description: "Select a category",
      });
      return;
    }

    if (!selectedCity) {
      toast({
        title: "Search",
        variant: "destructive",
        description: "Select a city",
      });
      return;
    }

    categorySearchData[category]({
      city: selectedCity,
      locations: selectedLocations,
    });

    router.push(`/search/${category}`);
  };

  return (
    <div className="relative w-full mx-auto max-w-lg">
      <div className="w-full rounded-2xl mx-auto border p-2 border-gray-100 shadow-lg overflow-hidden bg-white">
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

          <div className="">
            <LocationSelector
              disabled={!category}
              selectedCity={selectedCity}
              toggleLocation={toggleLocation}
              selectedLocations={selectedLocations}
              availableLocations={CitiesLocations?.[selectedCity] ?? []}
            />
          </div>

          <FilterToggle
            showFilters={showFilters}
            setShowFilters={setShowFilters}
          />

          {showFilters && <SearchFilters category={category} />}

          <SearchButton category={category} onClick={handleSearch} />
        </div>
      </div>
    </div>
  );
};

export default SmartSearch;
