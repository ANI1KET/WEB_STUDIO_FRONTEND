import { useInfiniteQuery } from "@tanstack/react-query";

import { PAGE_SIZE } from "@/app/lib/constant";
import { getRoomFilteredData } from "./serveraction";
import { useGetRoomSearchData } from "@/app/providers/reactqueryProvider";

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
