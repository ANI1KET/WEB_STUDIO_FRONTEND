"use client";

import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { X, Filter, RotateCcw } from "lucide-react";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { PAGE_SIZE } from "@/app/lib/constants";
import { getCategoryDetails } from "@/app/common/serverAction/Room";
import { furnishingStatus, roomType } from "@/app/common/config/Room";
import { FurnishingStatus, RoomData, RoomType } from "@/app/types/types";

import RoomCard from "@/app/common/ui/Room";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";

type Filters = {
  sortBy: string;
  roomShape: RoomType | "";
  furnishing: FurnishingStatus | "";
  availability: "available" | "occupied" | "";
};

const sortOptions = [
  { value: "", label: "Sort by" },
  { value: "price_low", label: "Price: Low → High" },
  { value: "price_high", label: "Price: High → Low" },
  { value: "rating_low", label: "Rating: Low → High" },
  { value: "rating_high", label: "Rating: High → Low" },
] as const;

const allRoomTypes = ["1BK", "2BK", ...roomType];

const RoomsCity = ({ city }: { city: string }) => {
  const router = useRouter();

  const [filters, setFilters] = useState<Filters>({
    sortBy: "",
    roomShape: "" as RoomType | "",
    furnishing: "" as FurnishingStatus | "",
    availability: "" as "available" | "occupied" | "",
  });

  const setFilter = useCallback(
    <K extends keyof Filters>(key: K, value: Filters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery<
      RoomData[],
      Error,
      InfiniteData<RoomData[]>,
      [string],
      string | undefined
    >({
      queryKey: [`room${city}`],
      queryFn: ({ pageParam }) =>
        getCategoryDetails({
          city,
          category: "room",
          lastDataId: pageParam,
        }),
      getNextPageParam: (lastPage) =>
        lastPage?.length === PAGE_SIZE
          ? lastPage[lastPage.length - 1].id
          : undefined,
      staleTime: 600_000,
      gcTime: 600_000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      initialPageParam: undefined,
    });

  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && handleLoadMore(),
      { rootMargin: "300px" }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [handleLoadMore]);

  const rooms = useMemo(() => {
    const pages = data?.pages.flat() || [];

    let filtered = pages;

    filtered = filtered.filter((room) => {
      const f = filters;
      return (
        (!f.roomShape || room.roomType === f.roomShape) &&
        (!f.furnishing || room.furnishingStatus === f.furnishing) &&
        (!f.availability ||
          (f.availability === "available" ? room.available : !room.available))
      );
    });

    switch (filters.sortBy) {
      case "price_low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating_low":
        filtered.sort((a, b) => a.ratings - b.ratings);
        break;
      case "rating_high":
        filtered.sort((a, b) => b.ratings - a.ratings);
        break;
    }

    return filtered;
  }, [data, filters]);

  const clearAllFilters = () =>
    setFilters({
      sortBy: "",
      roomShape: "",
      furnishing: "",
      availability: "",
    });

  const hasActiveFilters = Object.values(filters).some(Boolean);

  return (
    <>
      <div className="bg-green-50 p-6 rounded-lg shadow-sm border mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-1 text-lg font-semibold text-green-800">
            <span className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-green-600" />
              Filter Results
            </span>

            <span>
              ({rooms.length} rooms available in {city})
            </span>
          </div>

          {hasActiveFilters && (
            <Button
              size="sm"
              variant="outline"
              onClick={clearAllFilters}
              className="flex items-center gap-1 text-red-600"
            >
              <RotateCcw className="w-4 h-4" />
              Clear Filters
            </Button>
          )}
        </div>

        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Sort By</InputLabel>

            <Select
              label="Sort By"
              value={filters.sortBy}
              onChange={(e) => setFilter("sortBy", e.target.value)}
            >
              {sortOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Room Type</InputLabel>

            <Select
              label="Room Type"
              value={filters.roomShape}
              onChange={(e) => setFilter("roomShape", e.target.value)}
            >
              <MenuItem value="">
                <em>All Types</em>
              </MenuItem>

              {allRoomTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Furnishing</InputLabel>

            <Select
              label="Furnishing"
              value={filters.furnishing}
              onChange={(e) =>
                setFilter("furnishing", e.target.value as FurnishingStatus | "")
              }
            >
              <MenuItem value="">
                <em>All Furnishing</em>
              </MenuItem>

              {furnishingStatus.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Availability</InputLabel>

            <Select
              label="Availability"
              value={filters.availability}
              onChange={(e) => setFilter("availability", e.target.value)}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>

              <MenuItem value="available">Available</MenuItem>
              <MenuItem value="occupied">Occupied</MenuItem>
            </Select>
          </FormControl>
        </div>

        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t flex flex-wrap gap-2">
            {(
              Object.entries(filters) as [
                keyof Filters,
                Filters[keyof Filters]
              ][]
            ).map(([key, value]) =>
              value ? (
                <Badge
                  key={key}
                  onClick={() => setFilter(key, "")}
                  className="bg-green-200 text-green-800 hover:bg-red-500 hover:text-black cursor-pointer flex items-center gap-1"
                >
                  {key}: {String(value)}
                  <X className="w-3 h-3" />
                </Badge>
              ) : null
            )}
          </div>
        )}
      </div>

      {rooms.length > 0 ? (
        <>
          <div className="flex flex-wrap justify-evenly">
            {rooms.map((room) => (
              <div key={room.id} className="mb-4">
                <RoomCard room={room} />
              </div>
            ))}
          </div>

          <div ref={observerRef} className="h-1" />

          {isFetchingNextPage && (
            <div className="flex justify-center items-center">
              <div className="w-8 h-8 bg-green-600 border-4 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              No Rooms Found
            </h3>

            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search in a different city.
            </p>

            <Button variant="outline" onClick={() => router.push("/")}>
              Back to Home
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomsCity;
