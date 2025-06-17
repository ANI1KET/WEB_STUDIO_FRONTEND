import { toast } from "sonner";
import { useCallback, useState } from "react";
import { InfiniteData, useQuery, useQueryClient } from "@tanstack/react-query";

import { RoomSearchQueries } from "@/app/types/filters";

import { RoomData } from "@/app/types/types";
import { useGetRoomSearchData } from "@/app/providers/reactqueryProvider";
import { fetchSelectedRoomDetails } from "../ServerAction/RoomPageLayout";

const findMatchingRoom = (
  roomId: string,
  cachedData: { pages: RoomData[][] }
): RoomData | undefined => {
  for (const page of cachedData.pages)
    for (const room of page) if (room.id === roomId) return room;
};

const getRoomCacheKey = (city: string, searchData: RoomSearchQueries) =>
  city ? [`room${city}`] : ["search/room", searchData];

export const useRoomDetails = (city: string, roomId: string) => {
  const queryClient = useQueryClient();
  const searchData = useGetRoomSearchData();

  const cacheKey = getRoomCacheKey(city, searchData);
  const cachedData =
    queryClient.getQueryData<InfiniteData<RoomData[]>>(cacheKey);

  const roomDetails = cachedData
    ? findMatchingRoom(roomId, cachedData)
    : undefined;

  const { data: fallbackRoomDetails } = useQuery<RoomData>({
    queryKey: ["selectedRoom", roomId],
    queryFn: () => fetchSelectedRoomDetails(roomId),
    enabled: !roomDetails,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return roomDetails ?? (fallbackRoomDetails as RoomData);
};

export function useImageModalControl(totalImages: number) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const open = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalImages);
  }, [totalImages]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
  }, [totalImages]);

  return {
    open,
    next,
    prev,
    close,
    isOpen,
    currentIndex,
  };
}

export function useRoomActions() {
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Room link copied to clipboard");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleCompare = () => {
    toast.success("Room Details are saved for comparison.");
  };

  const handleInterest = () => {
    toast.success(
      "The owner has been notified of your interest. They will contact you soon."
    );
  };

  const handleContactVerification = async (phoneNumber: string) => {
    console.log(phoneNumber);
    toast.success("Contact number is updated.");
  };

  return {
    handleShare,
    handleCompare,
    handleInterest,
    handleContactVerification,
  };
}
