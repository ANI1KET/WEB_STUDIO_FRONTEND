import { RoomData } from "@/app/types/types";
import { ComparisonField } from "../QuickComparisonTable/types";

export const comparisonFields: Array<ComparisonField<keyof RoomData>> = [
  {
    key: "price",
    label: "Price/Month",
    format: (value) => `₹${String(value).toLocaleString()}`,
  },
  {
    key: "maxCapacity",
    label: "Capacity",
    format: (_value, room) => `${room.minCapacity}-${room.maxCapacity}`,
  },
  {
    key: "furnishingStatus",
    label: "Furnishing",
    format: (value) => String(value).replace("_", " "),
  },
  { key: "roomType", label: "Room Type", format: (value) => String(value) },
  { key: "city", label: "City", format: (value) => String(value) },
  { key: "location", label: "Location", format: (value) => String(value) },
  // {
  //   key: "verified",
  //   label: "Verified",
  //   format: (value) => (value ? "✅ Yes" : "❌ No"),
  // },
  { key: "bedroom", label: "Bedrooms", format: (value) => String(value) },
  { key: "hall", label: "Halls", format: (value) => String(value) },
  { key: "kitchen", label: "Kitchens", format: (value) => String(value) },
  { key: "bathroom", label: "Bathrooms", format: (value) => String(value) },
  { key: "postedBy", label: "Posted By", format: (value) => String(value) },
  // { key: "ratings", label: "Rating", format: (value) => `⭐ ${value}` },
];
