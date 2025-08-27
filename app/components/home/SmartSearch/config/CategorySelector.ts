import { Category } from "../../config/SmartSearch";

export const groupedCategoryOptions: {
  Rental: Category[];
  "Buy/Sell": Category[];
} = {
  Rental: [
    "room",
    // "Hostel", "Apartment/Commercial", "Vehicle"
  ],
  "Buy/Sell": ["house", "land", "vehicle"],
} as const;
