"use server";

import axios from "axios";

import { SignUpFormData } from "./Schema";
import axiosInstance from "../lib/axiosInstance";
import { createOtpUrl, createUserUrl } from "../common/endPoints/user";

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

export const createUser = async (
  otp: string,
  signUpData: SignUpFormData
): Promise<{ success: boolean; message: string }> => {
  "use server";

  try {
    const { data } = await axiosInstance.post(createUserUrl, {
      otp,
      ...signUpData,
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data.message };
    } else {
      return { success: false, message: "Unable to Create Account" };
    }
  }
};
