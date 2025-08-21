"use server";

import axios from "axios";

import axiosInstance from "@/app/lib/axiosInstance";
import { updateEmailAndPhoneUrl } from "@/app/common/endPoints/user";
import { getAutheticationHeader } from "@/app/common/serverAction/header";

export const updateEmailAndPhone = async (
  otp: string,
  phoneNumber: string
): Promise<{ success: boolean; message: string }> => {
  "use server";

  try {
    const { data } = await axiosInstance.put(
      updateEmailAndPhoneUrl,
      { otp, phoneNumber },
      await getAutheticationHeader()
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data.message };
    } else {
      return {
        success: false,
        message: "Unable to update number. Try again later.",
      };
    }
  }
};
