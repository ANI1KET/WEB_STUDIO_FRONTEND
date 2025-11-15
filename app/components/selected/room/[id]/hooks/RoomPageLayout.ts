import { useCallback, useState } from "react";

import { RoomData } from "@/app/types/types";
import { useToast } from "@/app/common/hooks/use-toast";
import { pushInterestedRoom } from "../ServerAction/RoomPageLayout";

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
    });

    toast({
      description: message,
      title: "Room Interest Notification",
      variant: success ? "default" : "destructive",
    });
  };

  return {
    handleShare,
    handleCompare,
    handleInterest,
  };
}
