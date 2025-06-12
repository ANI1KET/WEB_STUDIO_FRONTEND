"use client";

import React, { useState } from "react";

import {
  convertArea,
  convertAreaToSqft,
  formatAreaWithUnit,
} from "@/app/lib/areaConverters";

import { DoubleSlider } from "./DoubleSlider";
import { Label } from "@/app/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/app/components/ui/toggle-group";

interface AreaSliderProps {
  label: string;
  className?: string;
  value: [number, number];
  availableUnits: string[];
  onChange: (value: [number, number]) => void;
}

const AreaSlider = ({
  label,
  value,
  onChange,
  className,
  availableUnits,
}: AreaSliderProps) => {
  const [areaUnit, setAreaUnit] = useState<string>("sqft");
  const [displayValue, setDisplayValue] = useState<[number, number]>(value);

  const getSliderParams = () => {
    switch (areaUnit) {
      case "sqft":
        return { min: 100, max: 151000, step: 50 };
      case "sqm":
        return { min: 10, max: 14000, step: 5 };
      case "acre":
        return { min: 0.01, max: 3.4, step: 0.01 };
      case "aana":
        return { min: 0.1, max: 440, step: 0.1 };
      case "dhur":
        return { min: 0.1, max: 825, step: 0.5 };
      case "bigha":
        return { min: 0.001, max: 2, step: 0.001 };
      case "kattha":
        return { min: 0.01, max: 40, step: 0.01 };
      default:
        return { min: 100, max: 10000, step: 100 };
    }
  };

  const { min, max, step } = getSliderParams();

  const formatValue = (val: number) => {
    return formatAreaWithUnit(val, areaUnit);
  };

  const handleValueChange = (newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      const range: [number, number] = [newValue[0], newValue[1]];
      setDisplayValue(range);

      const convertedSqftMin = convertAreaToSqft(newValue[0], areaUnit);
      const convertedSqftMax = convertAreaToSqft(newValue[1], areaUnit);

      onChange([convertedSqftMin, convertedSqftMax]);
    }
  };

  const handleUnitChange = (newUnit: string) => {
    if (newUnit && newUnit !== areaUnit) {
      // Convert current values to new unit
      const [convertedMin, convertedSqftMin] = convertArea(
        displayValue[0],
        areaUnit,
        newUnit
      );
      const [convertedMax, convertedSqftMax] = convertArea(
        displayValue[1],
        areaUnit,
        newUnit
      );
      const newRange: [number, number] = [convertedMin, convertedMax];

      setAreaUnit(newUnit);
      setDisplayValue(newRange);
      onChange([convertedSqftMin, convertedSqftMax]);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between items-center">
        <Label className="text-sm font-medium text-gray-700">
          {label} Area
        </Label>
        <div className="text-sm text-gray-600 font-medium">
          {formatValue(displayValue[0])} - {formatValue(displayValue[1])}
        </div>
      </div>

      <div className="">
        <ToggleGroup
          type="single"
          value={areaUnit}
          onValueChange={handleUnitChange}
          className="border rounded-md bg-white/10 backdrop-blur-sm justify-start flex-wrap"
        >
          {availableUnits.map((unitOption) => (
            <ToggleGroupItem
              key={unitOption}
              value={unitOption}
              aria-label={unitOption}
              className="px-2 py-1 text-xs data-[state=on]:bg-green-600 data-[state=on]:text-white whitespace-nowrap"
            >
              {unitOption}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <DoubleSlider
          min={min}
          max={max}
          step={step}
          className="mt-2"
          showTooltip="auto"
          value={displayValue}
          valueFormatter={formatValue}
          onValueChange={handleValueChange}
        />

        <div className="flex justify-between text-xs text-gray-500">
          <span>{formatValue(min)}</span>
          <span>{formatValue(max)}</span>
        </div>
      </div>
    </div>
  );
};

export default AreaSlider;
