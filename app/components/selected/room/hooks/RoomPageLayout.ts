import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import { InfiniteData, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  fetchRoom,
  generateOtp,
  updateNumber,
  pushInterestedRoom,
} from "../ServerAction/RoomPageLayout";
import { RoomData } from "@/app/types/types";
import { useToast } from "@/app/common/hooks/use-toast";
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
  const { toast } = useToast();
  const { data: session, update } = useSession();

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Room",
        description: "Room link copied to clipboard",
      });
    } catch {
      toast({
        title: "Room",
        variant: "destructive",
        description: "Failed to copy link",
      });
    }
  };

  const handleCompare = () => {
    try {
      const existingRooms = JSON.parse(
        localStorage.getItem("ComparisonRooms") || "[]"
      ) as RoomData[];

      if (existingRooms.some((room) => room.id === roomData.id)) {
        toast({
          title: "Room",
          description: "Room Details already exist in comparison list.",
        });
        return;
      }

      existingRooms.push(roomData);
      localStorage.setItem("ComparisonRooms", JSON.stringify(existingRooms));
      toast({
        title: "Room",
        description: "Room Details added to comparison list.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Room",
        variant: "destructive",
        description: "Unable to add room details to comparison list.",
      });
    }
  };

  const handleInterest = async (): Promise<void> => {
    const { success, message } = await pushInterestedRoom({
      roomId: roomData.id,
      listerId: roomData.listerId,
      userId: session?.user.userId as string,
    });

    toast({
      description: message,
      title: "Room Interest Notification",
      variant: success ? "default" : "destructive",
    });
  };

  const handleContactVerification = async (
    phoneNumber: string,
    otp: string
  ): Promise<boolean> => {
    const { message, success } = await updateNumber({
      otp,
      number: phoneNumber,
      userId: session?.user.userId as string,
    });

    if (success) {
      await update({
        ...session,
        user: {
          ...session?.user,
          number: phoneNumber,
        },
      });
    }

    toast({
      title: "Account",
      description: message,
      variant: success ? "default" : "destructive",
    });

    return success;
  };

  const handleGenerateOtp = async (phoneNumber: string) => {
    const { message, success } = await generateOtp({
      number: phoneNumber,
    });

    toast({
      title: "Account",
      description: message,
      variant: success ? "default" : "destructive",
    });
  };

  return {
    handleShare,
    handleCompare,
    handleInterest,
    handleGenerateOtp,
    handleContactVerification,
  };
}
