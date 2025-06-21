import { throttle } from "lodash";
import { useCallback, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import {
  useGetRoomSearchData,
  useUpdateRoomFiletrsData,
} from "@/app/providers/reactqueryProvider";
import { PAGE_SIZE } from "@/app/lib/constant";
import { RoomFilters } from "@/app/types/filters";
import { getRoomFilteredData } from "../serverAction/SearchFilters";

// ROOM
export const useInfiniteRoomQuery = () => {
  const cachedData = useGetRoomSearchData();
  const { city, locations, ...filters } = cachedData;

  return useInfiniteQuery({
    queryKey: ["search/room", cachedData],
    queryFn: ({ pageParam = 0 }) =>
      getRoomFilteredData({
        city,
        locations,
        filters: filters,
        offset: pageParam,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const currentOffset = allPages.length * PAGE_SIZE;
      return lastPage.length === PAGE_SIZE ? currentOffset : undefined;
    },
    initialPageParam: 0,
    gcTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

export const useRoomFilterUpdater = () => {
  const updateFilters = useUpdateRoomFiletrsData();
  const pendingFiltersRef = useRef<Partial<RoomFilters>>({});

  const throttledUpdateCache = useRef(
    throttle(
      () => {
        updateFilters(pendingFiltersRef.current);
        pendingFiltersRef.current = {};
      },
      1000,
      { leading: true, trailing: true }
    )
  ).current;

  const updateFilter = useCallback(
    <K extends keyof RoomFilters>(key: K, value: RoomFilters[K]) => {
      pendingFiltersRef.current = {
        ...pendingFiltersRef.current,
        [key]: value,
      };
      throttledUpdateCache();
    },
    [throttledUpdateCache]
  );

  return updateFilter;
};
