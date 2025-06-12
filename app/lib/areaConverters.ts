/**
 * Area conversion utilities for different units
 * Data is always stored in sqft for areas and ft for dimensions
 */

// Conversion factors to square feet (base unit for storage)
const AREA_CONVERSIONS = {
  sqft: 1,
  sqm: 10.764,
  acre: 43560,
  aana: 342.25, // 1 aana = 342.25 sq ft (approximate)
  dhur: 182.25, // 1 dhur = 182.25 sq ft (approximate)
  bigha: 72900, // 1 bigha = 72900 sq ft (approximate, varies by region)
  kattha: 3645, // 1 kattha = 3645 sq ft (approximate, varies by region)
};

// Conversion factors for dimensions (ft is base unit for storage)
const DIMENSION_CONVERSIONS = {
  ft: 1,
  mt: 3.28084,
};

/**
 * Converts area from one unit to another
 * @param value - The area value to convert
 * @param fromUnit - The unit to convert from
 * @param toUnit - The unit to convert to
 * @returns Converted area value
 */
export function convertArea(
  value: number,
  fromUnit: string,
  toUnit: string
): [number, number] {
  const fromFactor =
    AREA_CONVERSIONS[fromUnit as keyof typeof AREA_CONVERSIONS];
  const toFactor = AREA_CONVERSIONS[toUnit as keyof typeof AREA_CONVERSIONS];

  // Convert to square feet first, then to target unit
  const sqftValue = value * fromFactor;

  if (fromUnit === toUnit) return [value, Math.round(sqftValue * 100) / 100];

  const convertedValue = sqftValue / toFactor;

  // Round to reasonable decimal places
  return [
    Math.round(convertedValue * 100) / 100,
    Math.round(sqftValue * 100) / 100,
  ];
}
export function convertAreaToSqft(value: number, fromUnit: string): number {
  const fromFactor =
    AREA_CONVERSIONS[fromUnit as keyof typeof AREA_CONVERSIONS];

  // Convert to square feet first, then to target unit
  const sqftValue = value * fromFactor;

  // Round to reasonable decimal places
  return Math.round(sqftValue * 100) / 100;
}

/**
 * Converts dimensions from one unit to another
 * @param value - The dimension value to convert
 * @param fromUnit - The unit to convert from ("ft" or "mt")
 * @param toUnit - The unit to convert to ("ft" or "mt")
 * @returns Converted dimension value
 */
export function convertDimension(
  value: number,
  fromUnit: string,
  toUnit: string
): [number, number] {
  const fromFactor =
    DIMENSION_CONVERSIONS[fromUnit as keyof typeof DIMENSION_CONVERSIONS];
  const toFactor =
    DIMENSION_CONVERSIONS[toUnit as keyof typeof DIMENSION_CONVERSIONS];

  // Convert to feet first, then to target unit
  const ftValue = value * fromFactor;

  if (fromUnit === toUnit) return [value, Math.round(ftValue * 100) / 100];

  const convertedValue = ftValue / toFactor;

  // Round to reasonable decimal places
  return [
    Math.round(convertedValue * 100) / 100,
    Math.round(ftValue * 100) / 100,
  ];
}
export function convertDimensionToSqft(
  value: number,
  fromUnit: string
): number {
  const fromFactor =
    DIMENSION_CONVERSIONS[fromUnit as keyof typeof DIMENSION_CONVERSIONS];

  // Convert to feet first, then to target unit
  const ftValue = value * fromFactor;

  // Round to reasonable decimal places
  return Math.round(ftValue * 100) / 100;
}

/**
 * Formats area value with appropriate unit label
 * @param value - The area value
 * @param unit - The unit
 * @returns Formatted string
 */
export function formatAreaWithUnit(value: number, unit: string): string {
  // Format large numbers with commas
  return `${value.toLocaleString()} ${unit}`;
}

/**
 * Formats dimension value with appropriate unit label
 * @param value - The dimension value
 * @param unit - The unit
 * @returns Formatted string
 */
export function formatDimensionWithUnit(value: number, unit: string): string {
  const unitLabels = {
    ft: "ft",
    mt: "m",
  };

  const label = unitLabels[unit as keyof typeof unitLabels] || unit;
  return `${value}${label}`;
}
