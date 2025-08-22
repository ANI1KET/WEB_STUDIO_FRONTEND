"use client";

import { useSession } from "next-auth/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useRef } from "react";

import {
  useRoomActions,
  useRoomDetails,
  useImageModalControl,
} from "./hooks/RoomPageLayout";
import { RoomData } from "@/app/types/types";
import { PAGE_SIZE } from "@/app/lib/constants";
import { amenityIcons } from "./icons/RoomPageLayout";
import { getCategoryDetails } from "@/app/common/serverAction/Room";

import RoomCard from "@/app/common/ui/Room";
import RoomImageModal from "./RoomPageLayout/RoomImageModal";
import RoomDetailsMain from "./RoomPageLayout/RoomDetailsMain";
import RoomAmenitiesLayout from "./RoomPageLayout/RoomAmenities";
import RoomDetailsAction from "./RoomPageLayout/RoomDetailsAction";
import OptimizedRoomGallery from "./RoomPageLayout/OptimizedRoomGallery";

interface RoomLayoutProps {
  city: string;
  roomId: string;
}

const RoomLayout: React.FC<RoomLayoutProps> = ({ city, roomId }) => {
  const { data: session } = useSession();

  const { roomData, isLoading, isError } = useRoomDetails(city, roomId);
  const { handleShare, handleCompare, handleInterest } =
    useRoomActions(roomData);
  const { open, next, prev, close, isOpen, currentIndex } =
    useImageModalControl(roomData?.photos.length);

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: isLoadingData,
  } = useInfiniteQuery({
    queryKey: [`room${roomData?.city}`],
    queryFn: ({ pageParam = 0 }) =>
      getCategoryDetails({
        city,
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
    enabled: !!roomData?.city,
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

  if (isLoading) {
    return <LoadingSkeletop />;
  }
  if (isError) {
    return <ErrorLayout city={city} />;
  }
  return (
    <div className="bg-gray-50/50 min-h-[calc(100vh-4rem)] font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="overflow-hidden shadow-2xl border border-green-100/50 rounded-3xl bg-white/95 backdrop-blur-sm hover:shadow-green-200/40">
          <OptimizedRoomGallery
            title={roomData.title}
            onImageModalOpen={open}
            videos={roomData.videos}
            photos={roomData.photos}
          />
        </div>

        <RoomDetailsAction
          id={roomData.id}
          session={session}
          city={roomData.city}
          onShare={handleShare}
          title={roomData.title}
          price={roomData.price}
          onCompare={handleCompare}
          ratings={roomData.ratings}
          onInterest={handleInterest}
          postedBy={roomData.postedBy}
          listerId={roomData.listerId}
          location={roomData.location}
          verified={roomData.verified}
          available={roomData.available}
          listerName={roomData.listerName}
          primaryContact={roomData.primaryContact}
          secondaryContact={roomData.secondaryContact}
        />

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-100/50 overflow-hidden hover:shadow-green-200/40">
          <RoomDetailsMain
            hall={roomData.hall}
            bedroom={roomData.bedroom}
            kitchen={roomData.kitchen}
            bathroom={roomData.bathroom}
            roomType={roomData.roomType}
            createdAt={roomData.createdAt}
            updatedAt={roomData.updatedAt}
            direction={roomData.direction}
            minCapacity={roomData.minCapacity}
            maxCapacity={roomData.maxCapacity}
            description={roomData.description}
            furnishingStatus={roomData.furnishingStatus}
          />
        </div>

        <RoomAmenitiesLayout
          amenityIcons={amenityIcons}
          amenities={roomData.amenities}
        />
      </div>

      <div className="py-4 sm:py-8 px-4 bg-gradient-to-r from-green-50/80 via-white/50 to-green-50/80 border-t border-green-200/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Explore More Rooms in {city}
            </h2>

            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Still looking? There&apos;s more to see in {city}.
            </p>
          </div>

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
                  page.map((room) => (
                    <RoomCard key={room.id} room={room as RoomData} />
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
      </div>

      <RoomImageModal
        onNext={next}
        onPrev={prev}
        isOpen={isOpen}
        onClose={close}
        title={roomData.title}
        photos={roomData.photos}
        currentImageIndex={currentIndex}
      />
    </div>
  );
};

export default RoomLayout;

const LoadingSkeletop = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="relative group w-full animate-pulse">
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-gray-100 rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-gradient-x"></div>

        <div className="absolute inset-y-1/2 inset-x-4 flex items-center justify-between">
          <div className="h-10 w-10 rounded-full bg-white/80 shadow-md"></div>
          <div className="h-10 w-10 rounded-full bg-white/80 shadow-md"></div>
        </div>

        <div className="absolute bottom-4 left-4 h-6 w-20 rounded-md bg-black/20"></div>

        <div className="absolute top-4 left-4 flex gap-2">
          <div className="h-9 w-24 rounded-md bg-black/30"></div>
          <div className="h-9 w-28 rounded-md bg-black/30"></div>
        </div>
      </div>

      <div className="p-2 bg-gray-50 border-t">
        <div className="flex overflow-x-auto gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="m-1 relative flex-shrink-0 w-20 h-16 bg-gray-200 rounded-lg"
            ></div>
          ))}
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="p-6 animate-pulse">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          <div className="flex-1 space-y-6">
            <div className="space-y-4">
              <div className="h-6 w-3/4 rounded-md bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-[gradient-x_1.2s_ease-in-out_infinite]"></div>
              </div>
              <div className="h-5 w-1/2 rounded-md bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-[gradient-x_1.2s_ease-in-out_infinite]"></div>
              </div>
            </div>

            <div className="flex gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-6 w-24 rounded-md bg-gray-200 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-[gradient-x_1.2s_ease-in-out_infinite]"></div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="h-20 rounded-xl bg-gray-100 border border-gray-200 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-[gradient-x_1.2s_ease-in-out_infinite]"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-72 space-y-4">
            <div className="h-10 w-full rounded-md bg-gray-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-[gradient-x_1.2s_ease-in-out_infinite]"></div>
            </div>
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-10 w-full rounded-md bg-gray-100 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-[gradient-x_1.2s_ease-in-out_infinite]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ErrorLayout = ({ city }: { city: string }) => (
  <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-br from-green-50 via-white to-green-100 px-6 py-12 animate-fade-in">
    <div className="bg-white/90 backdrop-blur-md border border-green-200 shadow-xl rounded-3xl max-w-xl w-full p-8 space-y-6 text-center transition-all duration-300 hover:shadow-green-300/40 hover:scale-[1.01]">
      <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-green-100 border border-green-300 shadow-inner animate-pulse">
        <svg
          className="w-8 h-8 text-green-600"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4m0 4h.01M12 6a9 9 0 100 18 9 9 0 000-18z"
          />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-green-700 tracking-tight">
        Room Details Couldn&apos;t Be Loaded
      </h2>

      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
        Something went wrong while fetching this room&apos;s details. It might
        be removed or temporarily unavailable. Please try again later or browse
        other available rooms in{" "}
        <span className="text-green-800 font-semibold">{city}</span>.
      </p>

      <p className="text-sm text-gray-500 italic">
        We appreciate your patience and apologize for the inconvenience.
      </p>
    </div>
  </div>
);
