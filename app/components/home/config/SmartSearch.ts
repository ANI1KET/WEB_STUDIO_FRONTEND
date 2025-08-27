import { Role } from "@prisma/client";

import { setRoomSearchData } from "@/app/providers/reactqueryProvider";

export const roles: Role[] = ["OWNER", "BROKER", "USER"];

export const categorySearchData = {
  promote: () => {},
  room: setRoomSearchData,
  land: setRoomSearchData,
  house: setRoomSearchData,
  hostel: setRoomSearchData,
  vehicle: setRoomSearchData,
  property: setRoomSearchData,
  reMarketItem: setRoomSearchData,
};
export type Category = keyof typeof categorySearchData;

//

//

//

//

//

// City options
export const cities = [
  { label: "Kathmandu", value: "kathmandu" },
  { label: "Pokhara", value: "pokhara" },
  { label: "Lalitpur", value: "lalitpur" },
  { label: "Bhaktapur", value: "bhaktapur" },
  { label: "Biratnagar", value: "biratnagar" },
  { label: "Chitwan", value: "chitwan" },
  { label: "Butwal", value: "butwal" },
];

// Room type options
export const roomTypes = [
  { label: "Single", value: "single" },
  { label: "Double", value: "double" },
  { label: "Studio", value: "studio" },
];

// Bedrooms options
export const bedroomsOptions = [
  { label: "1+", value: "1" },
  { label: "2+", value: "2" },
  { label: "3+", value: "3" },
  { label: "4+", value: "4" },
  { label: "5+", value: "5" },
];

// Bathrooms options
export const bathroomsOptions = [
  { label: "1+", value: "1" },
  { label: "2+", value: "2" },
  { label: "3+", value: "3" },
  { label: "4+", value: "4" },
];

// Car make options
export const carMakeOptions = [
  { label: "Toyota", value: "toyota" },
  { label: "Honda", value: "honda" },
  { label: "Mahindra", value: "mahindra" },
  { label: "Tata", value: "tata" },
];

// Vehicle type options
export const vehicleTypes = [
  { label: "Sedan", value: "sedan" },
  { label: "SUV", value: "suv" },
  { label: "Bike", value: "bike" },
  { label: "Scooter", value: "scooter" },
];

// City and their locations mapping
export const cityLocationsMap: Record<string, string[]> = {
  kathmandu: ["Thamel", "New Road", "Baluwatar", "Lazimpat", "Kalanki"],
  pokhara: ["Lakeside", "Baidam", "Mahendrapool", "Sarangkot", "Pardi"],
  lalitpur: ["Patan", "Jawalakhel", "Satdobato", "Kupondole", "Pulchowk"],
  bhaktapur: [
    "Durbar Square",
    "Suryabinayak",
    "Katunje",
    "Lokanthali",
    "Thimi",
  ],
  biratnagar: [
    "Dharan Road",
    "Traffic Chowk",
    "Rani Mills",
    "Kanchanbari",
    "Tinpaini",
  ],
  chitwan: ["Bharatpur", "Ratnanagar", "Sauraha", "Meghauli", "Tikauli"],
  butwal: ["Tamnagar", "Devinagar", "Golpark", "Kalikanagar", "Traffic Chowk"],
};
