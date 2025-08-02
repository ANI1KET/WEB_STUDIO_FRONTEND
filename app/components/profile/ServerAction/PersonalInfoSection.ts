"use server";

import axiosInstance from "@/app/lib/axiosInstance";
import { updateEmailAndPhoneUrl } from "@/app/common/endPoints/user";
import { getAutheticationHeader } from "@/app/common/serverAction/header";

export const updateEmailAndPhone = async (formData: {
  email: string | null | undefined;
  phoneNumber: string | undefined;
}): Promise<string> => {
  "use server";

  await axiosInstance.put(
    updateEmailAndPhoneUrl,
    formData,
    await getAutheticationHeader()
  );

  return "";
};
