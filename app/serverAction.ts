"use server";

// import { cookies } from "next/headers";

import { PAGE_SIZE } from "@/app/lib/constant";

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

export async function getCategoryCitiesLocationDetails() {
  const url = `${process.env.BASE_URL}/api/place/data?limit=${PAGE_SIZE}`;

  const res = await fetch(url, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
