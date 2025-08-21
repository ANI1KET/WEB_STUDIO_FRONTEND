"use server";

import { OwnerDetails } from "@/app/types/types";
import axiosInstance from "@/app/lib/axiosInstance";
import { getOwnerUrl } from "@/app/common/endPoints/shared-rooms";
import { getAutheticationHeader } from "@/app/common/serverAction/header";

export const getOwnerDetails = async (): Promise<OwnerDetails[]> => {
  "use server";

  try {
    const { data } = await axiosInstance.get(
      getOwnerUrl,
      await getAutheticationHeader()
    );
    return data;
  } catch (error) {
    console.error("Error fetching owner details:", error);
    return [];
  }
};
