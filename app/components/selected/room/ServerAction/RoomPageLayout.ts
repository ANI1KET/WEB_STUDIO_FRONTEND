"use server";

import {
  updateNumberUrl,
  pushInterestedRoomUrl,
} from "@/app/common/endPoints/user";
import { RoomData } from "@/app/types/types";
import axiosInstance from "@/app/lib/axiosInstance";
import { baseRoomUrl } from "@/app/common/endPoints/room";
import { getAutheticationHeader } from "@/app/common/serverAction/header";

export const fetchRoom = async (roomId: string): Promise<RoomData> => {
  "use server";

  try {
    const { data } = await axiosInstance.get(`${baseRoomUrl}/room/${roomId}`);
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
  const response = await axiosInstance.post(
    `${updateNumberUrl}`,
    { userId, number },
    await getAutheticationHeader()
    // { ...(await getAutheticationHeader()) }
  );

  return response.data;
};

export const pushInterestedRoom = async ({
  roomId,
  userId,
  listerId,
  listerNumber,
}: {
  roomId: string;
  userId: string;
  listerId: string;
  listerNumber: string;
}) => {
  "use server";

  const { data } = await axiosInstance.post(
    pushInterestedRoomUrl,
    {
      userId,
      roomId,
      listerId,
      listerNumber,
    },
    await getAutheticationHeader()
    // { ...(await getAutheticationHeader()) }
  );

  return data;
};
