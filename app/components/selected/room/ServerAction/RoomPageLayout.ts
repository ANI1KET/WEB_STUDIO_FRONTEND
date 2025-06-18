"use server";

import { RoomData } from "@/app/types/types";
import axiosInstance from "@/app/lib/axiosInstance";

export const fetchRoom = async (roomId: string): Promise<RoomData> => {
  "use server";

  try {
    const { data } = await axiosInstance.get(`/room/${roomId}`);
    return data;
  } catch (error) {
    throw new Error(error?.toString() || "An unknown error occurred");
  }
};
