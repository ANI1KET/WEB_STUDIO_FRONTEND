"use server";

import axios from "axios";

import {
  updateNumberUrl,
  generateUserOtpUrl,
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
  otp,
  userId,
  number,
}: {
  otp: string;
  userId: string;
  number: string;
}): Promise<{ success: boolean; message: string }> => {
  "use server";

  try {
    const { data } = await axiosInstance.post(
      updateNumberUrl,
      { userId, number, otp },
      await getAutheticationHeader()
    );

    return data;
  } catch (error) {
    let errorMessage = "Unable to generate OTP. Try again later.";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    }

    return { success: false, message: errorMessage };
  }
};

export const pushInterestedRoom = async ({
  roomId,
  userId,
  listerId,
}: {
  roomId: string;
  userId: string;
  listerId: string;
}): Promise<{ success: boolean; message: string }> => {
  "use server";

  try {
    const { data } = await axiosInstance.post(
      pushInterestedRoomUrl,
      {
        userId,
        roomId,
        listerId,
      },
      await getAutheticationHeader()
      // { ...(await getAutheticationHeader()) }
    );

    return data;
  } catch (error) {
    let errorMessage = "Unable to notify lister.";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    }

    return { success: false, message: errorMessage };
  }
};

export const generateOtp = async ({ number }: { number: string }) => {
  "use server";

  try {
    const { data } = await axiosInstance.post(
      generateUserOtpUrl,
      { number },
      await getAutheticationHeader()
    );

    return data;
  } catch (error) {
    let errorMessage = "Unable to generate OTP. Try again later.";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    }

    return { success: false, message: errorMessage };
  }
};
