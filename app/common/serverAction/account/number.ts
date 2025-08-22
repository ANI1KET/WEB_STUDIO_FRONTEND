"use server";

import axios from "axios";

import { getAutheticationHeader } from "../header";
import { setNumberUrl } from "../../endPoints/user";
import axiosInstance from "@/app/lib/axiosInstance";

export const setNumber = async ({
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
      setNumberUrl,
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
