"use client";

import React, { useState } from "react";

import {
  convertDimension,
  convertDimensionToSqft,
} from "@/app/lib/areaConverters";

import { DoubleSlider } from "./DoubleSlider";
import { Label } from "@/app/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/app/components/ui/toggle-group";

interface PlotDimensionsSliderProps {
  label: string;
  className?: string;
  availableUnits: string[];
  widthValue: [number, number];
  lengthValue: [number, number];
  onWidthChange: (value: [number, number]) => void;
  onLengthChange: (value: [number, number]) => void;
}

const PlotDimensionsSlider = ({
  label,
  className,
  widthValue,
  lengthValue,
  onWidthChange,
  onLengthChange,
  availableUnits,
}: PlotDimensionsSliderProps) => {
  const [plotUnit, setPlotUnit] = useState<string>("ft");
  const [displayWidthValue, setDisplayWidthValue] =
    useState<[number, number]>(widthValue);
  const [displayLengthValue, setDisplayLengthValue] =
    useState<[number, number]>(lengthValue);

  const getSliderParams = () => {
    if (plotUnit === "ft") {
      return { min: 5, max: 500, step: 2 };
    } else {
      return { min: 1, max: 150, step: 1 };
    }
  };

  const { min, max, step } = getSliderParams();

  const formatValue = (val: number) => {
    return `${val}${plotUnit}`;
  };

  const handleUnitChange = (newUnit: string) => {
    if (newUnit && newUnit !== plotUnit) {
      const [convertedWidthMin, convertedWidthFtMin] = convertDimension(
        displayWidthValue[0],
        plotUnit,
        newUnit
      );
      const [convertedWidthMax, convertedWidthFtMax] = convertDimension(
        displayWidthValue[1],
        plotUnit,
        newUnit
      );
      const [convertedLengthMin, convertedLengthFtMin] = convertDimension(
        displayLengthValue[0],
        plotUnit,
        newUnit
      );
      const [convertedLengthMax, convertedLengthFtMax] = convertDimension(
        displayLengthValue[1],
        plotUnit,
        newUnit
      );

      const newWidthRange: [number, number] = [
        convertedWidthMin,
        convertedWidthMax,
      ];
      const newLengthRange: [number, number] = [
        convertedLengthMin,
        convertedLengthMax,
      ];

      setPlotUnit(newUnit);
      setDisplayWidthValue(newWidthRange);
      setDisplayLengthValue(newLengthRange);

      onWidthChange([convertedWidthFtMin, convertedWidthFtMax]);
      onLengthChange([convertedLengthFtMin, convertedLengthFtMax]);
    }
  };

  const handleWidthChange = (newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      const range: [number, number] = [newValue[0], newValue[1]];
      setDisplayWidthValue(range);

      const convertedSqftMin = convertDimensionToSqft(newValue[0], plotUnit);
      const convertedSqftMax = convertDimensionToSqft(newValue[1], plotUnit);

      onWidthChange([convertedSqftMin, convertedSqftMax]);
    }
  };

  const handleLengthChange = (newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      const range: [number, number] = [newValue[0], newValue[1]];
      setDisplayLengthValue(range);

      const convertedSqftMin = convertDimensionToSqft(newValue[0], plotUnit);
      const convertedSqftMax = convertDimensionToSqft(newValue[1], plotUnit);

      onLengthChange([convertedSqftMin, convertedSqftMax]);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex justify-between items-center">
        <Label className="text-sm font-medium text-gray-700">{label}</Label>
        <ToggleGroup
          type="single"
          value={plotUnit}
          onValueChange={handleUnitChange}
          className="border rounded-md bg-white/10 backdrop-blur-sm"
        >
          {availableUnits.map((unitOption) => (
            <ToggleGroupItem
              key={unitOption}
              value={unitOption}
              aria-label={unitOption}
              className="px-3 py-1 text-xs data-[state=on]:bg-green-600 data-[state=on]:text-white"
            >
              {unitOption}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium text-gray-600">Width</Label>
            <div className="text-sm text-gray-600 font-medium">
              {formatValue(displayWidthValue[0])} -
              {formatValue(displayWidthValue[1])}
            </div>
          </div>
          <DoubleSlider
            min={min}
            max={max}
            step={step}
            showTooltip="auto"
            value={displayWidthValue}
            valueFormatter={formatValue}
            onValueChange={handleWidthChange}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium text-gray-600">Length</Label>
            <div className="text-sm text-gray-600 font-medium">
              {formatValue(displayLengthValue[0])} -
              {formatValue(displayLengthValue[1])}
            </div>
          </div>
          <DoubleSlider
            min={min}
            max={max}
            step={step}
            showTooltip="auto"
            value={displayLengthValue}
            valueFormatter={formatValue}
            onValueChange={handleLengthChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PlotDimensionsSlider;
