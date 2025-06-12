"use client";

import {
  Stack,
  Typography,
  Slider as MuiSlider,
  SliderProps as MuiSliderProps,
} from "@mui/material";
import * as React from "react";

import { cn } from "@/app/lib/utils";

interface DoubleSliderProps extends Omit<MuiSliderProps, "value"> {
  min: number;
  max: number;
  step: number;
  label?: string;
  error?: boolean;
  className?: string;
  showMarks?: boolean;
  helperText?: string;
  value?: number | number[];
  defaultValue?: number | number[];
  showTooltip?: "auto" | "on" | "off";
  valueFormatter?: (value: number) => string;
  customMarks?: { value: number; label: string }[];
  onValueChange?: (value: number | number[]) => void;
}

export const DoubleSlider = React.forwardRef<HTMLDivElement, DoubleSliderProps>(
  (
    {
      min,
      max,
      step,
      label,
      value,
      className,
      helperText,
      customMarks,
      defaultValue,
      error = false,
      onValueChange,
      showMarks = false,
      showTooltip = "auto",
      valueFormatter = (val) => val.toString(),
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<number | number[]>(
      defaultValue ?? [min, max]
    );

    const handleChange = (_: Event, newValue: number | number[]) => {
      setInternalValue(newValue);
    };

    // Create marks if showMarks is true or customMarks are provided
    const marks = React.useMemo(() => {
      if (customMarks) return customMarks;
      if (showMarks) {
        // Generate basic marks based on min, max
        const step = (max - min) / 4;
        return [
          { value: min as number, label: min.toString() },
          { value: min + step, label: "" },
          { value: min + 2 * step, label: "" },
          { value: min + 3 * step, label: "" },
          { value: max as number, label: max.toString() },
        ];
      }
      return undefined;
    }, [customMarks, showMarks, max, min]);

    // Determine if displaying range
    const isRange = Array.isArray(internalValue);

    // Format value for display
    const displayValue = React.useMemo(() => {
      if (isRange && Array.isArray(internalValue)) {
        return `${valueFormatter(internalValue[0])} - ${valueFormatter(
          internalValue[1]
        )}`;
      }
      return valueFormatter(internalValue as number);
    }, [internalValue, isRange, valueFormatter]);

    React.useEffect(() => {
      if (value) setInternalValue(value);
    }, [value]);

    return (
      <div className="space-y-2">
        {label && (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="body2"
              color={error ? "error" : "text.primary"}
            >
              {label}
            </Typography>

            <Typography
              variant="body2"
              fontWeight="medium"
              color={error ? "error" : "text.secondary"}
            >
              {displayValue}
            </Typography>
          </Stack>
        )}

        <MuiSlider
          min={min}
          max={max}
          ref={ref}
          step={step}
          marks={marks}
          value={internalValue}
          onChange={handleChange}
          valueLabelDisplay={showTooltip}
          onChangeCommitted={(_, newValue) => {
            if (onValueChange) onValueChange(newValue);
          }}
          className={cn(
            "relative flex w-full touch-none select-none items-center",
            className
          )}
          sx={{
            height: 8,
            color: error ? "error.main" : "primary.main",
            "& .MuiSlider-track": {
              height: 8,
            },
            "& .MuiSlider-rail": {
              height: 8,
              opacity: 0.5,
              bgcolor: error ? "error.light" : "#a5d6a7",
            },
            "& .MuiSlider-thumb": {
              width: 20,
              height: 20,
              backgroundColor: "#fff",
              border: "2px solid currentColor",
              "&:focus, &:hover, &.Mui-active": {
                boxShadow: "inherit",
              },
            },
            "& .MuiSlider-valueLabel": {
              top: -10,
              fontSize: 12,
              fontWeight: "normal",
              backgroundColor: "primary.dark",
              "&:before": {
                display: "none",
              },
            },
          }}
          {...props}
        />

        {helperText && (
          <Typography
            variant="caption"
            color={error ? "error" : "text.secondary"}
          >
            {helperText}
          </Typography>
        )}
      </div>
    );
  }
);

DoubleSlider.displayName = "DoubleSlider";
