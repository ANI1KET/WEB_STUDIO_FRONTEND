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
