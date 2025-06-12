"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { RoomSearchQueries } from "@/app/types/filters";
import { CategoryCitiesLocations } from "@/app/types/types";

import {
  getCategoryCityLocations,
  getCategoryCitiesLocations,
} from "../serverAction/SmartSearch";

export function FetchCategoryCitiesLocations(category: string, city: string) {
  return useQuery({
    queryKey: [`${category}CitiesLocations`],
    queryFn: async (): Promise<CategoryCitiesLocations> =>
      await getCategoryCitiesLocations(city, category),
    retry: 0,
    gcTime: Infinity,
    staleTime: Infinity,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
}

export function FetchCategoryCityLocations() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      city,
      category,
    }: {
      city: string;
      category: string;
    }) => {
      const data = await getCategoryCityLocations({ city, category });

      return {
        city,
        data,
        category,
      };
    },
    onSuccess: (result) => {
      const { city, category, data } = result;

      queryClient.setQueryData(
        [`${category}CitiesLocations`],
        (cachedData: RoomSearchQueries) => ({
          ...cachedData,
          [city]: data[city],
        })
      );
    },
    retry: 0,
  });

  return mutation;
}
