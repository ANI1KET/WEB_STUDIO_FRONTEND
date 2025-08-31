"use server";

import { cookies } from "next/headers";

export const getAutheticationHeader = async (): Promise<
  { headers: { Cookie: string; "Cache-Control": string } } | undefined
> => {
  const cookieStore = await cookies();
  const sessionToken =
    cookieStore.get("__Secure-next-auth.session-token")?.value ||
    cookieStore.get("next-auth.session-token")?.value;

  return {
    headers: {
      "Cache-Control": "no-cache",
      Cookie: `next-auth.session-token=${sessionToken}`,
    },
  };
};
