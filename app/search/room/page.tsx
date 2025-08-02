"use client";

import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import { X, Filter, SlidersHorizontal } from "lucide-react";

import { useInfiniteRoomQuery } from "./hooks";

import {
  Drawer,
  DrawerTitle,
  DrawerHeader,
  DrawerContent,
} from "../../components/ui/drawer";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import SearchFilters from "@/app/components/search/room/SearchFilters";
import SearchResults from "@/app/components/search/room/SearchResults";

const RoomSearch = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data, hasNextPage, isFetchingNextPage, isLoading, fetchNextPage } =
    useInfiniteRoomQuery();

  const memoizedPages = useMemo(() => data?.pages ?? [], [data?.pages]);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
    <div className="bg-gradient-to-br from-green-50 via-white to-emerald-50 h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row gap-4">
        <div className="hidden md:block md:w-1/2 lg:w-1/3">
          <div className="w-full sticky top-[4.5rem] max-h-[calc(100vh-5rem)] overflow-y-auto p-2 rounded-lg border-2 border-green-200 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 p-1">
              <Filter className="h-5 w-5 text-green-600" />
              <span>Filters</span>
            </h2>

            <SearchFilters />
          </div>
        </div>

        <div className="w-full py-2 grid [@media(max-width:460px)]:grid-cols-1 grid-cols-2 lg:grid-cols-3 gap-2">
          {isLoading ? (
            <>
              {Array.from({ length: 6 }, (_, i) => (
                <RoomCardSkeleton key={`skeleton-${i}`} />
              ))}
            </>
          ) : (
            <>
              {memoizedPages.map((roomDetails, pageIndex) => (
                <SearchResults key={pageIndex} rooms={roomDetails} />
              ))}
            </>
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
        </div>
      </div>

      <div className="fixed bottom-2 right-2 z-40 md:hidden">
        <Button
          variant="default"
          onClick={() => setIsDrawerOpen(true)}
          className="hover:bg-green-200 backdrop-blur-lg text-white shadow-lg rounded-full px-6"
        >
          <SlidersHorizontal className="h-5 w-5 mr-2" />
          <span>Filters</span>
        </Button>
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="h-[50vh]">
          <div className="mx-auto w-full px-5 pb-4 h-full flex flex-col">
            <DrawerHeader className="text-left">
              <DrawerTitle className="flex items-center justify-between text-xl font-bold">
                <div className="flex items-center gap-1">
                  <Filter className="h-5 w-5 text-green-600" />
                  <span>Filter Rooms</span>
                </div>

                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full h-8 w-8"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </DrawerTitle>
            </DrawerHeader>

            <div className="flex-1 overflow-y-auto">
              <SearchFilters />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default RoomSearch;

const RoomCardSkeleton = () => {
  return (
    <Card className="animate-pulse">
      <div className="h-48 bg-gray-200 rounded-t-lg"></div>
      <CardContent className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-5 bg-gray-200 rounded"></div>
        <div className="h-3 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-8 bg-gray-200 rounded"></div>
      </CardContent>
    </Card>
  );
};
