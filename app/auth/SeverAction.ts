"use server";

import axios from "axios";

import { SignUpFormData } from "./Schema";
import axiosInstance from "../lib/axiosInstance";
import { createUserUrl } from "../common/endPoints/user";

export const createUser = async (data: SignUpFormData): Promise<string> => {
  "use server";

  try {
    const response = await axiosInstance.post(createUserUrl, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.message;
    } else {
      return "Unable to Create Account";
    }
  }
};
