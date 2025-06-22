import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import { InfiniteData, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  fetchRoom,
  updateNumber,
  pushSavedRoom,
} from "../ServerAction/RoomPageLayout";
import { RoomData } from "@/app/types/types";
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

export function useRoomActions(roomData: RoomData) {
  const { data: session, update } = useSession();

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Room link copied to clipboard");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleCompare = () => {
    try {
      const existingRooms = JSON.parse(
        localStorage.getItem("ComparisionRooms") || "[]"
      ) as RoomData[];

      if (existingRooms.some((room) => room.id === roomData.id)) {
        toast.success("Room Details already exist in comparison list.");
        return;
      }

      existingRooms.push(roomData);
      localStorage.setItem("ComparisionRooms", JSON.stringify(existingRooms));
      toast.success("Room Details added to comparison list.");
    } catch (error) {
      console.error(error);
      toast.error("Unable to add room details to comparison list.");
    }
  };

  const handleInterest = async () => {
    try {
      const existingRooms = JSON.parse(
        localStorage.getItem("InterestedRooms") || "[]"
      ) as RoomData[];

      if (existingRooms.some((room) => room.id === roomData.id)) {
        toast.success("Lister has already been notified of your interest.");
        return;
      }

      await pushSavedRoom({
        roomId: roomData.id,
        listerId: roomData.listerId,
        userId: session?.user.userId as string,
      });

      existingRooms.push(roomData);
      localStorage.setItem("InterestedRooms", JSON.stringify(existingRooms));
      toast.success(
        "Lister has been notified of your interest. They will contact you soon."
      );
    } catch (error) {
      console.error("Failed to save data.", error);
      toast.error("Unable to notify lister.");
    }
  };

  const handleContactVerification = async (phoneNumber: string) => {
    const response = await updateNumber({
      number: phoneNumber,
      userId: session?.user.userId as string,
    });

    if (response !== "Failed") {
      await update({
        ...session,
        user: {
          ...session?.user,
          number: phoneNumber,
        },
      });
      toast.success("Contact number is updated.");
    }
    toast.error("Contact couldn't be updated. Please try again.");
  };

  return {
    handleShare,
    handleCompare,
    handleInterest,
    handleContactVerification,
  };
}
