"use server";

import axios from "axios";

import axiosInstance from "@/app/lib/axiosInstance";
import { generateOtpUrl, updatePasswordUrl } from "@/app/common/endPoints/user";

export const generateOtp = async (
  emailOrPhone: string
): Promise<{ userId?: string; message: string }> => {
  "use server";

  try {
    const { data } = await axiosInstance.post(generateOtpUrl, { emailOrPhone });

    return data;
  } catch (error) {
    let errorMessage = "Unable to generate OTP. Try again later.";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    }

    return { message: errorMessage };
  }
};

export const updatePassword = async (formData: {
  otp: string;
  userId: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<{ success: boolean; message: string }> => {
  "use server";

  try {
    const { data } = await axiosInstance.put(updatePasswordUrl, formData);

    return data;
  } catch (error) {
    let errorMessage = "Something went wrong. Please try again.";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    }

    return { success: false, message: errorMessage };
  }
};
