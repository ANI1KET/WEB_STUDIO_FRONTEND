"use client";

import {
  Slider as MuiSlider,
  SliderProps as MuiSliderProps,
} from "@mui/material";
import * as React from "react";

import { cn } from "@/app/lib/utils";
import { DoubleSlider } from "./slider/DoubleSlider";

interface SliderProps extends Omit<MuiSliderProps, "value" | "onChange"> {
  value?: number | number[];
  onValueChange?: (value: number | number[]) => void;
  className?: string;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ className, value, onValueChange, ...props }, ref) => {
    const handleChange = (_: Event, newValue: number | number[]) => {
      if (onValueChange) onValueChange(newValue);
    };

    return (
      <MuiSlider
        ref={ref}
        value={value}
        onChange={handleChange}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        sx={{
          height: 8,
          "& .MuiSlider-track": {
            height: 8,
            bgcolor: "primary.main",
          },
          "& .MuiSlider-rail": {
            height: 8,
            bgcolor: "secondary.main",
          },
          "& .MuiSlider-thumb": {
            height: 20,
            width: 20,
            backgroundColor: "#fff",
            border: "2px solid currentColor",
            "&:focus, &:hover, &.Mui-active": {
              boxShadow: "inherit",
            },
          },
        }}
        {...props}
      />
    );
  }
);
Slider.displayName = "Slider";

export { Slider, DoubleSlider };
