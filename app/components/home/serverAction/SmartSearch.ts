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
      `${category}-service/${category}/cities-locations`,
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
      `${category}-service/${category}/city-locations?city=${city}`,
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
