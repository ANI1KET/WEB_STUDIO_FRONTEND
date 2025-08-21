"use server";

import { PAGE_SIZE } from "@/app/lib/constants";
import axiosInstance from "@/app/lib/axiosInstance";
import { PropertyData, RoomData } from "@/app/types/types";

export const getCategoryDetails = async ({
  city,
  category,
  offset = 0,
}: {
  city: string;
  offset: number;
  category: string;
}): Promise<RoomData[] | PropertyData[]> => {
  "use server";

  if (!category) throw new Error("Category is required.");

  try {
    const response = await axiosInstance.get(
      `${category}-service/${category}`,
      {
        params: {
          city,
          offset,
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
