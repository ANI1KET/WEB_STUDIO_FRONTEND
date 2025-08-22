"use server";

import axios from "axios";

import axiosInstance from "@/app/lib/axiosInstance";
import { updateOrSetPasswordUrl } from "../../endPoints/user";

export const updateOrSetPassword = async (formData: {
  otp: string;
  userId: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<{ success: boolean; message: string }> => {
  "use server";

  try {
    const { data } = await axiosInstance.put(updateOrSetPasswordUrl, formData);

    return data;
  } catch (error) {
    let errorMessage = "Something went wrong. Please try again.";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    }

    return { success: false, message: errorMessage };
  }
};
