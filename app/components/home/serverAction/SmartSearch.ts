"use server";

import { AxiosError } from "axios";

import axiosInstance from "@/app/lib/axiosInstance";

export async function getCategoryCitiesLocations(
  city?: string,
  category?: string
) {
  "use server";

  try {
    const response = await axiosInstance.get(
      `/place/cities-locations/${category}`,
      {
        params: {
          city,
        },
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw error.response?.data?.error;
    }
    throw error;
  }
}

export async function getCategoryCityLocations({
  city,
  category,
}: {
  city: string;
  category: string;
}): Promise<Record<string, string[]>> {
  "use server";

  try {
    const response = await axiosInstance.get(
      `/place/city-locations?category=${category}&city=${city}`,
      {
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw error.response?.data?.error;
    }
    throw error;
  }
}
