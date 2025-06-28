"use server";

import { cookies } from "next/headers";

import { RoomData } from "@/app/types/types";
import axiosInstance from "@/app/lib/axiosInstance";

export const getAutheticationHeader = async (): Promise<
  { headers: { Cookie: string; "Cache-Control": string } } | undefined
> => {
  const cookieStore = await cookies();
  const sessionToken =
    cookieStore.get("__Secure-next-auth.session-token")?.value ||
    cookieStore.get("next-auth.session-token")?.value;

  return {
    headers: {
      Cookie: `next-auth.session-token=${sessionToken}`,
      "Cache-Control": "no-cache",
    },
  };
};

export const fetchRoom = async (roomId: string): Promise<RoomData> => {
  "use server";

  try {
    const { data } = await axiosInstance.get(`/room/${roomId}`);
    return data;
  } catch (error) {
    throw new Error(error?.toString() || "An unknown error occurred");
  }
};

export const updateNumber = async ({
  userId,
  number,
}: {
  userId: string;
  number: string;
}): Promise<string> => {
  "use server";

  try {
    const response = await axiosInstance.post(
      `/user/number`,
      { userId, number },
      await getAutheticationHeader()
      // { ...(await getAutheticationHeader()) }
    );

    return response.data;
  } catch (error) {
    console.error("Error decoding query parameter:", error);
    return "Failed";
  }
};

export const pushSavedRoom = async ({
  roomId,
  userId,
  userName,
  listerId,
  userEmail,
  listerName,
  userContact,
  listerContact,
}: {
  roomId: string;
  userId: string;
  userName: string;
  listerId: string;
  userEmail: string;
  listerName: string;
  userContact: string;
  listerContact: string;
}) => {
  "use server";

  try {
    const { data } = await axiosInstance.post(
      `/interestedrooms/add`,
      {
        userId,
        roomId,
        listerId,
        userName,
        userEmail,
        listerName,
        userContact,
        listerContact,
      },
      await getAutheticationHeader()
      // { ...(await getAutheticationHeader()) }
    );
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error?.toString() || "An unknown error occurred");
  }
};
