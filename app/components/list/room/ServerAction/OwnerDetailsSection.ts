"use server";

import axiosInstance from "@/app/lib/axiosInstance";
import { getOwnerUrl } from "@/app/common/endPoints/user";
import { getAutheticationHeader } from "@/app/common/serverAction/header";

export const getOwnerDetails = async (): Promise<
  { id: string; name: string; email: string; number: string }[]
> => {
  "use server";

  try {
    const { data } = await axiosInstance.get(
      `${getOwnerUrl}`,
      await getAutheticationHeader()
    );
    return data;
  } catch (error) {
    console.error("Error fetching owner details:", error);
    return [];
  }
};
