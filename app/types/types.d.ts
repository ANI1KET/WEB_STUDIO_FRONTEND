import { Role } from "@prisma/client";

export type CategoryCitiesLocations = Record<string, string[]>;

// --------------------------------------------------------------------------------
// LISTER DETAILS
export type Lister = {
  id: string;
  role: Role;
  name: string;
  email: string;
  image: string;
  number: string;
  createdAt: string;
};

// --------------------------------------------------------------------------------
// OWNER DETAILS
export type OwnerDetails = {
  name: string;
  email: string;
  number: string;
  ownerId: string;
  listerOwnerId: string;
};

// --------------------------------------------------------------------------------
// INTERESTED ROOMS
export type InterestedRooms = {
  id: string;
  lister: Lister;
  rooms: string[];
  createdAt: string;
};

// --------------------------------------------------------------------------------
// ROOM
export type RoomAmenities =
  | "AC"
  | "WIFI"
  | "POOL"
  | "LIFT"
  | "OVEN"
  | "SOFA"
  | "GARDEN"
  | "GEYSER"
  | "FRIDGE"
  | "BALCONY"
  | "TERRACE"
  | "CHIMNEY"
  | "CAR PARK"
  | "BIKE PARK"
  | "24/7 WATER"
  | "FIRE SAFETY"
  | "POWER BACKUP"
  | "WASHING MANCHINE";
export type RoomType = "FLAT" | "1BHK" | "2BHK" | "3BHK" | "4BHK";
export type FurnishingStatus = "FURNISHED" | "SEMIFURNISHED" | "UNFURNISHED";

export type Room = {
  hall: number;
  city: string;
  title: string;
  price: number;
  kitchen: number;
  bedroom: number;
  location: string;
  bathroom: number;
  listerName: string;
  roomType: RoomType;
  minCapacity: number;
  maxCapacity: number;
  description: string;
  primaryContact: string;
  secondaryContact: string;
  direction: string | null;
  amenities: RoomAmenities[];
  furnishingStatus: FurnishingStatus;
  // ENUM
  postedBy: Role;
  // RELATION
  listerId: string;
};

export type RoomWithMedia = Room & {
  photos: File[];
  videos: FileList | null;
};

export type RoomWithMediaUrl = Room & {
  photos: string[];
  videos: string | null;
};

export type ListedRoom = RoomWithMediaUrl & {
  id: string;
  ownerId: string;
  ratings: number;
  available: boolean;
  // DATE
  createdAt: string;
  updatedAt: string;
};

export type RoomData = ListedRoom & {
  lister: Lister;
  reviews: {
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
  }[];
};

// // --------------------------------------------------------------------------------
// // PROPERTY
// export type PropertyType = "House" | "Land";

// export type PropertyAreaUnits =
//   | "sqm"
//   | "sqft"
//   | "acre"
//   | "aana"
//   | "dhur"
//   | "bigha"
//   | "kattha";
// // | 'dam'
// // | 'paisa'
// // | 'ropani'

// export type PropertyPlotUnits = "ft" | "mt";
// export type PropertyHouseAreaUnits = "sqft" | "sqm";

// export type PropertyAmenities =
//   | "CCTV"
//   | "LIFT"
//   | "GARDEN"
//   | "CAR PARK"
//   | "BIKE PARK"
//   | "FIRE SAFETY"
//   | "SOLAR PANELS"
//   | "SWIMMING POOL";

// export type PropertyNearByAreas =
//   | "MALL"
//   | "PARK"
//   | "BANK"
//   | "SCHOOL"
//   | "MARKET"
//   | "TEMPLE"
//   | "CHURCH"
//   | "MOSQUE"
//   | "AIRPORT"
//   | "COLLEGE"
//   | "HOSPITAL"
//   | "BUS STOP"
//   | "FIRE STATION"
//   | "POLICE STATION";

// export type BaseProperty = {
//   city: string;
//   area: number;
//   title: string;
//   // price: string | number;
//   price: number;
//   location: string;
//   description: string;
//   ownerContact: string;
//   primaryContact: string;
//   direction: string | null;
//   nearbyAreas: PropertyNearByAreas[];
//   // ENUM
//   postedBy: Role;
//   // RELATION
//   sellerId: string;
// };

// export type House = BaseProperty & {
//   floors: number;
//   bedrooms: number;
//   kitchens: number;
//   bathrooms: number;
//   builtUpArea: number;
//   amenities: PropertyAmenities[];

//   // propertyType: "House";
// };

// export type Land = BaseProperty & {
//   plotWidth: number;
//   plotLength: number;

//   // propertyType: "Land";
// };

// export type Property = House | Land;

// export type PropertyWithMedia = Property & {
//   photos: File[];
//   documents: File[];
//   video: FileList | null;
// };

// export type PropertyWithMediaUrl = Property & {
//   photos: string[];
//   documents: string[];
//   video: string | null;
// };

// export type ListedProperty = PropertyWithMediaUrl & {
//   id: string;
//   verified: boolean;
//   available: boolean;
//   // DATE
//   createdAt: string;
//   updatedAt: string;
// };

// export type PropertyData = ListedProperty & {
//   seller: {
//     id: string;
//     role: Role;
//     name: string;
//     email: string;
//     number: string;
//   };
// };
