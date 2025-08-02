"use client";

import dynamic from "next/dynamic";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";

import { useToast } from "@/app/common/hooks/use-toast";

import { RoomData } from "@/app/types/types";
import { PAGE_SIZE } from "@/app/lib/constant";
import { getCategoryDetails } from "@/app/common/serverAction/Room";

const RoomCitySelector = dynamic(
  () => import("./RoomsByCity/RoomCitySelector")
);
const RoomCard = dynamic(() => import("@/app/common/ui/Room"));

const RoomsByCity: React.FC<{
  city: string;
  cities: string[];
}> = ({ city, cities }) => {
  const { toast } = useToast();

  const [activeCity, setActiveCity] = useState(city);
  const [activeVideoRoomId, setActiveVideoRoomId] = useState<string | null>(
    null
  );

  // Toggle video for a specific room
  const handleToggleVideo = (roomId: string, show: boolean) => {
    setActiveVideoRoomId(show ? roomId : null);
  };

  const handleCityChange = (city: string) => {
    setActiveCity(city);
    toast({ title: "Room", description: `Showing rooms in ${city}` });
  };

  const { data, hasNextPage, isFetchingNextPage, isLoading, fetchNextPage } =
    useInfiniteQuery({
      queryKey: [`room${activeCity}`],
      queryFn: ({ pageParam = 0 }) =>
        getCategoryDetails({
          city: activeCity,
          category: "room",
          offset: pageParam,
        }),
      getNextPageParam: (lastPage, allPages) => {
        const currentOffset = allPages.length * PAGE_SIZE;
        return lastPage.length === PAGE_SIZE ? currentOffset : undefined;
      },
      initialPageParam: 0,
      gcTime: 1000 * 60 * 10,
      staleTime: 1000 * 60 * 10,
      refetchOnReconnect: false,
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
        rootMargin: "300px",
        threshold: 0,
      }
    );

    const target = observerRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [handleLoadMore]);

  return (
    <section className="py-8 sm:py-12 px-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-green-300/20 via-green-200/10 to-green-300/30"></div>

      <div className="max-w-7xl mx-auto relative">
        <RoomCitySelector
          cities={cities}
          activeCity={activeCity}
          handleCityChange={handleCityChange}
        />

        <div className="flex space-x-4 md:space-x-6 pb-2 overflow-x-auto">
          {isLoading ? (
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
                page.map((room) => (
                  <RoomCard
                    key={room.id}
                    room={room as RoomData}
                    setShowVideo={handleToggleVideo}
                    showVideo={activeVideoRoomId === room.id}
                  />
                ))
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
      </div>
    </section>
  );
};

export default RoomsByCity;
