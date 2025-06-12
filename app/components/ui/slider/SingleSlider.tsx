"use client";

import {
  Stack,
  Typography,
  Slider as MuiSlider,
  SliderProps as MuiSliderProps,
} from "@mui/material";
import * as React from "react";
import { cn } from "@/app/lib/utils";

interface SingleSliderProps extends Omit<MuiSliderProps, "value"> {
  min: number;
  max: number;
  step: number;
  label?: string;
  error?: boolean;
  className?: string;
  helperText?: string;
  defaultValue: number;
  showTooltip?: "auto" | "on" | "off";
  onValueChange?: (value: number) => void;
  valueFormatter?: (value: number) => string;
}

export const SingleSlider = React.forwardRef<HTMLDivElement, SingleSliderProps>(
  (
    {
      min,
      max,
      step,
      label,
      className,
      helperText,
      defaultValue,
      error = false,
      onValueChange,
      showTooltip = "auto",
      valueFormatter = (val) => val.toString(),
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] =
      React.useState<number>(defaultValue);

    const handleChange = (_: Event, newValue: number) => {
      setInternalValue(newValue);
    };

    const displayValue = React.useMemo(() => {
      return `${valueFormatter(min)} - ${internalValue}`;
    }, [min, internalValue, valueFormatter]);

    return (
      <div className="space-y-2">
        {label && (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
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
          value={internalValue}
          onChange={handleChange}
          onChangeCommitted={(_, newValue) => {
            if (onValueChange) onValueChange(newValue);
          }}
          valueLabelDisplay={showTooltip}
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

SingleSlider.displayName = "SingleSlider";
