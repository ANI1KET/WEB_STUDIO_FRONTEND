/**
 * Formats a number as currency in INR format
 * @param value - The number to format
 * @returns Formatted string with ₹ symbol
 */
export function formatPrice(value: number): string {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)}Cr`;
  } else if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  } else if (value >= 1000) {
    return `₹${(value / 1000).toFixed(0)}K`;
  }
  return `₹${value}`;
}

/**
 * Formats a number in Rating format
 * @param value - The number to format
 * @returns Formatted string with ★ symbol
 */
export function formatRating(value: number): string {
  return `${value} ${"★".repeat(value)}`;
}

/**
 * Formats a number in Capacity format
 * @param value - The number to format
 * @returns Formatted string with 👤 symbol
 */
export function formatCapacity(value: number): string {
  return `👤${value}`;
}

/**
 * Formats a number in Floor format
 * @param value - The number to format
 * @returns Formatted string with 🏢 symbol
 */
export function formatFloor(value: number): string {
  return `🏢${value}`;
}

/**
 * Formats a number in Bedroom format
 * @param value - The number to format
 * @returns Formatted string with 🛏️ symbol
 */
export function formatBedroom(value: number): string {
  return `🛏️${value}`;
}

/**
 * Formats a number in Kitchens format
 * @param value - The number to format
 * @returns Formatted string with  🍽️ symbol
 */
export function formatKitchen(value: number): string {
  return ` 🍽️${value}`;
}

/**
 * Formats a number in Bathroom format
 * @param value - The number to format
 * @returns Formatted string with 🛁 symbol
 */
export function formatBathroom(value: number): string {
  return ` 🛁${value}`;
}

/**
 * Formats a number as area in square feet
 * @param value - The area in square feet
 * @returns Formatted string with sq.ft
 */
export function formatArea(value: number): string {
  return `${value.toLocaleString()} sq.ft`;
}
