"use server";

import axios from "axios";

import { PAGE_SIZE } from "@/app/lib/constants";
import { ListedRoom } from "@/app/types/types";
import { RoomFilters } from "@/app/types/filters";
import axiosInstance from "@/app/lib/axiosInstance";
import { getRoomFilteredDataUrl } from "@/app/common/endPoints/room";

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
    const response = await axiosInstance.get(getRoomFilteredDataUrl, {
      params: {
        city,
        offset,
        limit: PAGE_SIZE,
        filters: JSON.stringify(filters),
        locations: JSON.stringify(locations),
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
