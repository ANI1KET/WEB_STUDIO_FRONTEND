import { Role } from "@prisma/client";

import { FurnishingStatus, RoomAmenities, RoomType } from "@/app/types/types";

export const postedBy: Role[] = ["OWNER", "BROKER"];

// ROOM OPTIONS DATA
export const roomAmenities: RoomAmenities[] = [
  "WIFI",
  "CAR PARK",
  "BIKE PARK",
  "24/7 WATER",
];
export const furnishingStatus: FurnishingStatus[] = [
  "FURNISHED",
  "UNFURNISHED",
  "SEMIFURNISHED",
];
export const roomType: RoomType[] = ["1BHK", "2BHK", "3BHK", "4BHK", "FLAT"];
