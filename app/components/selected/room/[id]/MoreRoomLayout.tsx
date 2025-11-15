"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

import { RoomData } from "@/app/types/types";
import { PAGE_SIZE } from "@/app/lib/constants";
import { getCategoryDetails } from "@/app/common/serverAction/Room";

import RoomCard from "@/app/common/ui/Room";

const MoreRoomLayout: React.FC<{
  city: string;
}> = ({ city }) => {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: isLoadingData,
  } = useInfiniteQuery<
    RoomData[],
    Error,
    InfiniteData<RoomData[]>,
    [string],
    string | undefined
  >({
    queryKey: [`room${city}`],
    queryFn: async ({ pageParam }) =>
      getCategoryDetails({
        city,
        category: "room",
        lastDataId: pageParam,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.length < PAGE_SIZE) return undefined;
      return lastPage[lastPage.length - 1].id;
    },
    gcTime: 1000 * 60 * 10,
    staleTime: 1000 * 60 * 10,
    refetchOnReconnect: false,
    initialPageParam: undefined,
    refetchOnWindowFocus: false,
  });

  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore();
        }
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "300px",
      }
    );

    const target = observerRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [handleLoadMore]);

  return (
    <div className="flex space-x-4 md:space-x-6 pb-2 overflow-x-auto">
      {isLoadingData ? (
        <div className="flex gap-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="w-[320px] h-[46vh] md:h-[58vh] bg-gray-200 animate-pulse rounded-lg overflow-hidden"
            >
              <div className="w-full h-[20vh] md:h-[26vh] bg-gray-300/30"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {data?.pages.map((page) =>
            page.map((room) => <RoomCard key={room.id} room={room} />)
          )}

          <div ref={observerRef} className="h-1 "></div>

          {isFetchingNextPage && (
            <div className="flex justify-center items-center">
              <div
                className={
                  "w-8 h-8 bg-green-600 border-4 border-t-transparent rounded-full animate-spin"
                }
              ></div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MoreRoomLayout;
