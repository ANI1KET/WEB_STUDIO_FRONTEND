"use server";

// import { cookies } from "next/headers";

import { PAGE_SIZE } from "@/app/lib/constants";
import { CategoryCitiesLocations, RoomData } from "./types/types";

// export const getAutheticationHeader = async (): Promise<
//   { headers: { Cookie: string; "Cache-Control": string } } | undefined
// > => {
//   const cookieStore = await cookies();
//   const sessionToken =
//     cookieStore.get("__Secure-next-auth.session-token")?.value ||
//     cookieStore.get("next-auth.session-token")?.value;

//   return {
//     headers: {
//       Cookie: `next-auth.session-token=${sessionToken}`,
//       "Cache-Control": "no-cache",
//     },
//   };
// };

export async function getRoomCitiesLocationDetails(city: string): Promise<{
  roomCityDetails: RoomData[];
  roomCitiesLocations: CategoryCitiesLocations;
}> {
  "use server";

  const url = `${process.env.SERVER_BASE_URL}/room-service/aggregator?city=${city}&limit=${PAGE_SIZE}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 600 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error(error);

    return {
      roomCityDetails: [],
      roomCitiesLocations: {},
    };
  }
}
