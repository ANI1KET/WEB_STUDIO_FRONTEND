import { useQueryClient } from "@tanstack/react-query";

import {
  deleteInterestedRoomsPerUser,
  deleteInterestedRoomPerLister,
  deleteInterestedRoomsPerLister,
} from "../serverAction/interestedRooms";
import { useToast } from "./use-toast";
import { InterestedRooms, ListedRoom } from "@/app/types/types";

export const useInterestedRoomsHandler = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handledeleteInterestedRoomPerLister = async (
    id: string,
    roomId: string
  ): Promise<boolean> => {
    const { message, success } = await deleteInterestedRoomPerLister(
      id,
      roomId
    );

    if (success) {
      queryClient.setQueryData<ListedRoom[]>(
        [id, "InterestedRoom"],
        (currentRooms) => {
          if (!currentRooms) return [];
          return currentRooms.filter((room) => room.id !== roomId);
        }
      );

      queryClient.setQueryData<InterestedRooms[]>(
        ["InterestedRooms"],
        (interestedRooms) => {
          if (!interestedRooms) return [];

          return interestedRooms.map((interestedRoom) => {
            if (interestedRoom.id === id) {
              return {
                ...interestedRoom,
                rooms: interestedRoom.rooms.filter(
                  (roomIdToRemove) => roomIdToRemove !== roomId
                ),
              };
            }
            return interestedRoom;
          });
        }
      );
    }

    toast({
      description: message,
      title: "Interested Rooms",
      variant: success ? "default" : "destructive",
    });

    return success;
  };

  const handledeleteInterestedRoomsPerLister = async (
    id: string
  ): Promise<boolean> => {
    const { message, success } = await deleteInterestedRoomsPerLister(id);

    if (success) {
      queryClient.setQueryData<InterestedRooms[]>(
        ["InterestedRooms"],
        (interestedRooms) => {
          if (!interestedRooms) return [];

          return interestedRooms.filter(
            (interestedRoom) => interestedRoom.id !== id
          );
        }
      );
    }

    toast({
      description: message,
      title: "Interested Rooms",
      variant: success ? "default" : "destructive",
    });

    return success;
  };

  const handledeleteInterestedRoomsPerUser = async (): Promise<boolean> => {
    const { message, success } = await deleteInterestedRoomsPerUser();

    if (success) {
      queryClient.setQueryData<InterestedRooms[]>(["InterestedRooms"], []);
    }

    toast({
      description: message,
      title: "Interested Rooms",
      variant: success ? "default" : "destructive",
    });

    return success;
  };

  return {
    handledeleteInterestedRoomsPerUser,
    handledeleteInterestedRoomPerLister,
    handledeleteInterestedRoomsPerLister,
  };
};
