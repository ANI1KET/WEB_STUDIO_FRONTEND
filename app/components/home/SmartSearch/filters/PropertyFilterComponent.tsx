"use client";

import React from "react";

import {
  // formatFloor,
  formatPrice,
  // formatKitchen,
  // formatBedroom,
  // formatBathroom,
} from "@/app/lib/formatters";
import {
  areaUnits,
  landPlotUnits,
  houseAreaUnits,
  // propertyHouseAmenities,
} from "./config/PropertyFilterComponent";
import {
  useGetPropertySearchData,
  useUpdatePropertySearchData,
} from "@/app/providers/reactqueryProvider";
import { Divider } from "@mui/material";

// import { Label } from "@/app/components/ui/label";
// import { Checkbox } from "@/app/components/ui/checkbox";
import AreaSlider from "@/app/components/ui/slider/AreaSlider";
// import { SingleSlider } from "@/app/components/ui/slider/SingleSlider";
import { DoubleSlider } from "@/app/components/ui/slider/DoubleSlider";
import PlotDimensionsSlider from "@/app/components/ui/slider/PlotDimensionsSlider";

const PropertyFilterComponent: React.FC = () => {
  const propertySearchData = useGetPropertySearchData();
  const updatePropertySearchData = useUpdatePropertySearchData();

  return (
    <div className="flex flex-col gap-2 p-2">
      <div>
        <DoubleSlider
          min={100000}
          step={200000}
          label="Price"
          max={100000000}
          showTooltip="auto"
          valueFormatter={formatPrice}
          defaultValue={[5000000, 10000000]}
          onValueChange={(newValue) =>
            updatePropertySearchData({
              ...propertySearchData,
              price: newValue,
            })
          }
        />
      </div>

      <Divider />

      <div>
        <AreaSlider
          value={[10000, 100000]}
          availableUnits={areaUnits}
          label={propertySearchData.propertyType}
          onChange={(value) =>
            updatePropertySearchData({
              ...propertySearchData,
              area: value,
            })
          }
        />
      </div>

      <Divider />

      {propertySearchData.propertyType === "House" ? (
        <>
          <AreaSlider
            label={"House BuiltUp"}
            value={[10000, 100000]}
            availableUnits={houseAreaUnits}
            onChange={(value) =>
              updatePropertySearchData({
                ...propertySearchData,
                builtUpArea: value,
              })
            }
          />

          {/* <Divider /> */}

          {/* <div className="grid grid-cols-2 gap-2">
            <SingleSlider
              min={1}
              max={25}
              step={1}
              label="Floors"
              defaultValue={2}
              showTooltip="auto"
              valueFormatter={formatFloor}
              onValueChange={(newValue) =>
                updatePropertySearchData({
                  ...propertySearchData,
                  floors: newValue,
                })
              }
            />
            <SingleSlider
              min={1}
              max={30}
              step={1}
              defaultValue={5}
              label="Beedrooms"
              showTooltip="auto"
              valueFormatter={formatBedroom}
              onValueChange={(newValue) =>
                updatePropertySearchData({
                  ...propertySearchData,
                  bedrooms: newValue,
                })
              }
            />

            <SingleSlider
              min={1}
              max={10}
              step={1}
              defaultValue={2}
              label="Kitchens"
              showTooltip="auto"
              valueFormatter={formatKitchen}
              onValueChange={(newValue) =>
                updatePropertySearchData({
                  ...propertySearchData,
                  kitchens: newValue,
                })
              }
            />
            <SingleSlider
              min={1}
              max={15}
              step={1}
              defaultValue={4}
              label="Bathrooms"
              showTooltip="auto"
              valueFormatter={formatBathroom}
              onValueChange={(newValue) =>
                updatePropertySearchData({
                  ...propertySearchData,
                  bathrooms: newValue,
                })
              }
            />
          </div> */}

          {/* <Label className="">Amenities</Label>
          <div className="grid grid-cols-3 gap-2">
            {propertyHouseAmenities.map((value) => (
              <div key={value} className="flex items-center gap-2">
                <Checkbox
                  id={`room-type-${value}`}
                  checked={propertySearchData.amenities?.includes(value)}
                  onCheckedChange={() =>
                    updatePropertySearchData({
                      ...propertySearchData,
                      amenities: propertySearchData.amenities?.includes(value)
                        ? propertySearchData.amenities.filter(
                            (check) => check !== value
                          )
                        : [...(propertySearchData.amenities ?? []), value],
                    })
                  }
                />
                <label htmlFor={`room-type-${value}`} className="text-sm">
                  {value}
                </label>
              </div>
            ))}
          </div> */}
        </>
      ) : (
        <PlotDimensionsSlider
          widthValue={[50, 100]}
          lengthValue={[50, 100]}
          label="Plot Dimensions"
          availableUnits={landPlotUnits}
          onWidthChange={(value) =>
            updatePropertySearchData({
              ...propertySearchData,
              plotWidth: value,
            })
          }
          onLengthChange={(value) =>
            updatePropertySearchData({
              ...propertySearchData,
              plotLength: value,
            })
          }
        />
      )}
    </div>
  );
};

export default PropertyFilterComponent;
