"use server";

import axios from "axios";

import {
  createOtpUrl,
  reGenerateOtpUrl,
  createEmailOrNumberOtpUrl,
} from "../../endPoints/user";
import { getAutheticationHeader } from "../header";
import axiosInstance from "@/app/lib/axiosInstance";

/**
 * CREATES THE NUMBER VERIFICATION OTP.
 *
 * NUMBER VERIFICATION IS REQUIRED IN THREE FLOWS:
 * 1) ADDING A NUMBER WHILE LISTING
 * 2) VERIFYING A NUMBER WHILE SIGNING UP
 * 3) ADDING A NUMBER WHILE SHOWING INTEREST IN A LISTING
 */
export const createOtp = async (
  number: string
): Promise<{ success: boolean; message: string }> => {
  "use server";

  try {
    const { data } = await axiosInstance.post(createOtpUrl, { number });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data.message };
    } else {
      return {
        success: false,
        message: "Unable to generate OTP. Try again later.",
      };
    }
  }
};
/**
 * REGENERATES THE NUMBER VERIFICATION OTP.
 *
 * NUMBER VERIFICATION IS REQUIRED IN THREE FLOWS:
 * 1) ADDING A NUMBER WHILE LISTING
 * 2) UPDATING A NUMBER THROUGH PROFILE
 * 3) ADDING A NUMBER WHILE SHOWING INTEREST IN A LISTING
 */
export const reGenerateOtp = async ({ number }: { number: string }) => {
  "use server";

  try {
    const { data } = await axiosInstance.post(
      reGenerateOtpUrl,
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

/**
 * CREATES THE PASSWORD RESET OTP.
 *
 * PASSWORD RESET OR CREATION IS REQUIRED IN TWO FLOWS:
 * 1) FORGOT PASSWORD FLOW
 * 2) CREATE/SET PASSWORD FLOW
 */
export const createEmailOrNumberOtp = async (
  emailOrPhone: string
): Promise<{ userId?: string; message: string }> => {
  "use server";

  try {
    const { data } = await axiosInstance.post(createEmailOrNumberOtpUrl, {
      emailOrPhone,
    });

    return data;
  } catch (error) {
    let errorMessage = "Unable to generate OTP. Try again later.";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    }

    return { message: errorMessage };
  }
};
