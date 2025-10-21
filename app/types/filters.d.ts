// import { Role } from "@prisma/client";

import {
  RoomType,
  RoomAmenities,
  FurnishingStatus,
  PropertyAmenities,
} from "./types";

// ROOM FILTERS
type NumberOrRange = number | number[];

export type RoomFilters = Partial<{
  // postedBy: Role[];
  verified: boolean;
  roomType: RoomType[];
  price: NumberOrRange;
  rating: NumberOrRange;
  capacity: NumberOrRange;
  amenities: RoomAmenities[];
  furnishingStatus: FurnishingStatus[];
}>;

export interface RoomSearchQueries extends RoomFilters {
  city: string;
  locations: string[];
}

// PROPERTY FILTERS
type CommonPropertyFilters = {
  verified: boolean;
  area: NumberOrRange;
  price: NumberOrRange;
  // nearbyAreas: PropertyNearByAreas[];
};

type HouseFilters = {
  floors: NumberOrRange;
  bedrooms: NumberOrRange;
  kitchens: NumberOrRange;
  bathrooms: NumberOrRange;
  builtUpArea: NumberOrRange;
  amenities: PropertyAmenities[];
};

type LandFilters = {
  plotWidth: NumberOrRange;
  plotLength: NumberOrRange;
};

type HousePropertyFilters = {
  propertyType: "House";
} & Partial<CommonPropertyFilters> &
  Partial<HouseFilters>;

type LandPropertyFilters = {
  propertyType: "Land";
} & Partial<CommonPropertyFilters> &
  Partial<LandFilters>;

export type PropertySearchQueries = {
  city: string;
  locations: string[];
} & (HousePropertyFilters | LandPropertyFilters);
