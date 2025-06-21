import { toast } from "sonner";
import { useCallback, useState } from "react";
import { InfiniteData, useQuery, useQueryClient } from "@tanstack/react-query";

import { RoomData } from "@/app/types/types";
import { fetchRoom } from "../ServerAction/RoomPageLayout";
import { useGetRoomSearchData } from "@/app/providers/reactqueryProvider";

const findMatchingRoom = (
  roomId: string,
  cachedData: { pages: RoomData[][] }
): RoomData | undefined => {
  for (const page of cachedData.pages)
    for (const room of page) if (room.id === roomId) return room;
};

export const useRoomDetails = (city: string, roomId: string) => {
  const queryClient = useQueryClient();
  const searchData = useGetRoomSearchData();

  const cachedData = city
    ? queryClient.getQueryData<InfiniteData<RoomData[]>>([`room${city}`])
    : queryClient.getQueryData<InfiniteData<RoomData[]>>([
        "search/room",
        searchData,
      ]);

  const roomFromCache = cachedData
    ? findMatchingRoom(roomId, cachedData)
    : undefined;

  const {
    isError,
    isLoading,
    data: fallbackRoomDetails,
  } = useQuery<RoomData>({
    queryKey: ["selectedRoom", roomId],
    queryFn: () => fetchRoom(roomId),
    enabled: !roomFromCache,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const roomData = roomFromCache ?? (fallbackRoomDetails as RoomData);

  return { roomData, isLoading, isError };
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
    toast.success("Room Details added to comparison list.");
  };

  const handleInterest = () => {
    toast.success(
      "Lister has been notified of your interest. They will contact you soon."
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
