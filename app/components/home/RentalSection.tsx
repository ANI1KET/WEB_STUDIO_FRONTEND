"use client";

import { useRouter } from "next/navigation";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  // Car,
  // Star,
  Home,
  // Users,
  // MapPin,
  // Building,
} from "lucide-react";

import { RoomData } from "@/app/types/types";
import { PAGE_SIZE } from "@/app/lib/constants";
import { getCategoryDetails } from "@/app/common/serverAction/Room";

import RoomCard from "@/app/common/ui/Room";
import { Button } from "@/app/components/ui/button";

const RentalSection: React.FC<{
  city: string;
  cities: string[];
}> = ({ city, cities }) => {
  const router = useRouter();

  const [activeCity, setActiveCity] = useState(city);
  const [activeCategory, setActiveCategory] = useState("rooms");

  const categories = [
    { id: "rooms", name: "Rooms", icon: Home },
    // { id: "hostels", name: "Hostels", icon: Users },
    // { id: "apartments", name: "Apartments", icon: Building },
  ];

  const { data, hasNextPage, isFetchingNextPage, isLoading, fetchNextPage } =
    useInfiniteQuery<
      RoomData[],
      Error,
      InfiniteData<RoomData[]>,
      [string],
      string | undefined
    >({
      queryKey: [`room${activeCity}`],
      queryFn: async ({ pageParam }) =>
        getCategoryDetails({
          city: activeCity,
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
    <section className="py-12 px-4 relative overflow-hidden bg-[linear-gradient(to_bottom,theme(colors.green.50)_1%,white_10%)]">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-green-600">
            Find Your Perfect Living Space
          </h2>

          <p className="text-sm text-primary mx-auto">
            Your perfect rental awaits - rooms, hostels, apartments and luxury
            stays in one place.
          </p>
        </div>

        <div className="flex justify-center items-center mb-4">
          <div className="flex flex-wrap justify-center gap-2 p-1 bg-green-50/30 border border-green-200 rounded-lg">
            {categories.map((category) => {
              const IconComponent = category.icon;
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 p-2 rounded-md transition-all duration-200 ${
                    isActive
                      ? "bg-green-600 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-green-200/75"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-2 p-1 overflow-x-auto mb-2 rounded-lg bg-green-50/30 border border-green-200">
          {cities.map((city) => {
            const isActive = activeCity === city;
            return (
              <button
                key={city}
                onClick={() => setActiveCity(city)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-green-200/75"
                }`}
              >
                {city}
              </button>
            );
          })}
        </div>

        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium text-blue-900">
            {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}{" "}
            in {activeCity}
          </h3>

          <Button
            variant="outline"
            onClick={() => router.push(`/${activeCategory}/${activeCity}`)}
          >
            View All {activeCategory}
          </Button>
        </div>

        {/* <div className="mb-8">
          <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Featured {categories.find((c) => c.id === activeCategory)?.name}
          </h3>

          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {data?.pages.map((page) =>
              page.map((room) => <RoomCard key={room.id} room={room} />)
            )}
          </div>
        </div> */}

        <div>
          {/* <h3 className="text-xl font-semibold text-blue-900 mb-4">
            More{" "}
            {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}{" "}
          </h3> */}

          <div className="flex space-x-4 md:space-x-6 pb-2 overflow-x-auto">
            {isLoading ? (
              <div className="flex gap-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="w-[320px] h-[46vh] md:h-[52vh] bg-gray-200 animate-pulse rounded-lg overflow-hidden"
                  >
                    <div className="w-full h-[20vh] md:h-[24vh] bg-gray-300/30"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {data?.pages.map((page) =>
                  page.map((room) => <RoomCard key={room.id} room={room} />)
                )}

                <div ref={observerRef} className="h-1"></div>
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
      </div>
    </section>
  );
};

export default RentalSection;
