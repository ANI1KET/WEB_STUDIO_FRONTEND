"use server";

import { RoomData } from "@/app/types/types";
import { PAGE_SIZE } from "@/app/lib/constants";
import axiosInstance from "@/app/lib/axiosInstance";

export const getCategoryDetails = async ({
  city,
  category,
  lastDataId,
}: {
  city: string;
  category: string;
  lastDataId?: string;
}): Promise<RoomData[]> => {
  "use server";

  if (!category) throw new Error("Category is required.");

  try {
    const response = await axiosInstance.get(
      `${category}-service/${category}`,
      {
        params: {
          city,
          lastDataId,
          limit: PAGE_SIZE,
        },
        headers: { "Cache-Control": "no-cache" },
      }
    );

    if (!response.data) {
      throw new Error("No data received from the server.");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching category details:", error);
    throw error;
  }
};
