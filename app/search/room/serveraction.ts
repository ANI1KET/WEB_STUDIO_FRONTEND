"use server";

import axios from "axios";

import { PAGE_SIZE } from "@/app/lib/constant";
import { ListedRoom } from "@/app/types/types";
import { RoomFilters } from "@/app/types/filters";
import axiosInstance from "@/app/lib/axiosInstance";

export const getRoomFilteredData = async ({
  city,
  filters,
  locations,
  offset = 0,
}: {
  city: string;
  offset: number;
  locations: string[];
  filters: RoomFilters;
}): Promise<ListedRoom[]> => {
  "use server";

  try {
    const response = await axiosInstance.get("room/filter", {
      params: {
        city,
        offset,
        filters,
        locations,
        limit: PAGE_SIZE,
      },
      headers: { "Cache-Control": "no-cache" },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    }
    throw error;
  }
};
