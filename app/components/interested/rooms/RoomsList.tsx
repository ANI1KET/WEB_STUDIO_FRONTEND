"use client";

import {
  // Eye,
  Bed,
  Bath,
  Star,
  Users,
  Share2,
  Square,
  MapPin,
  Trash2,
  ChefHat,
  Navigation,
  IndianRupee,
  RefreshCw,
} from "lucide-react";
import React from "react";
import { useQuery } from "@tanstack/react-query";

import { ListedRoom } from "@/app/types/types";
import { useToast } from "@/app/common/hooks/use-toast";
import { useInterestedRoomsHandler } from "@/app/common/hooks/interestedRooms";
import { getListerInterestedRooms } from "@/app/common/serverAction/interestedRooms";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import MediaCarousel from "./RoomsList/MediaCarousel";
import { Card, CardContent } from "@/app/components/ui/card";

interface RoomsListProps {
  id: string;
  roomIds: string[];
}

const RoomsList: React.FC<RoomsListProps> = ({ id, roomIds }) => {
  const {
    handledeleteInterestedRoomPerLister,
    handledeleteInterestedRoomsPerLister,
  } = useInterestedRoomsHandler();

  const {
    refetch,
    isLoading,
    isFetching,
    data: rooms = [],
  } = useQuery({
    queryKey: [id, "InterestedRoom"],
    queryFn: () => getListerInterestedRooms(roomIds),
    gcTime: Infinity,
    staleTime: Infinity,
  });

  if (isLoading)
    return (
      <div className="p-4 sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />

          <span className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="flex space-x-4 sm:space-x-6 pb-4 overflow-x-auto">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-72 sm:w-80">
              <RoomCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    );

  if (!rooms.length)
    return (
      <div className="p-6 flex flex-col items-center justify-center text-center text-gray-500 bg-red-50 rounded-lg shadow-inner">
        <MapPin className="w-8 h-8 text-red-600 mb-3" />

        <h4 className="text-lg font-semibold text-gray-700">
          Unable to fetch rooms
        </h4>

        <p className="text-sm text-gray-500 mt-1 max-w-sm mb-2">
          Interested rooms linked to this lister could not be loaded at the
          moment. Please try again later.
        </p>

        <Button
          size="sm"
          variant="destructive"
          disabled={isFetching}
          onClick={() => refetch()}
          className="flex items-center gap-2"
        >
          <RefreshCw
            className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
          />
          {isFetching ? "Retrying..." : "Retry"}
        </Button>
      </div>
    );

  const removeInterestedRoomsperLister = (id: string, roomId: string) => {
    if (rooms.length > 1) handledeleteInterestedRoomPerLister(id, roomId);
    else {
      handledeleteInterestedRoomsPerLister(id);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <h4 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
          Available Rooms
        </h4>

        <Badge
          variant="outline"
          className="text-xs sm:text-sm self-start sm:self-auto"
        >
          {rooms.length} room{rooms.length !== 1 ? "s" : ""}
          <Trash2
            onClick={() => handledeleteInterestedRoomsPerLister(id)}
            className="w-4 h-4 ml-2 text-red-600 cursor-pointer hover:scale-110"
          />
        </Badge>
      </div>

      <div className="flex space-x-4 sm:space-x-6 pb-4 overflow-x-auto">
        {rooms.map((room) => (
          <div key={room.id} className="flex-shrink-0 w-72 sm:w-80">
            <CompactRoomCard
              id={id}
              room={room}
              onRemove={removeInterestedRoomsperLister}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomsList;

interface CompactRoomCardProps {
  id: string;
  room: ListedRoom;
  onRemove: (id: string, roomId: string) => void;
}

const CompactRoomCard: React.FC<CompactRoomCardProps> = ({
  id,
  room,
  onRemove,
}) => {
  const { toast } = useToast();
  const formatFurnishingStatus = (status: string) => {
    if (!status) return "Not specified";
    return status
      .replace("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (l: string) => l.toUpperCase());
  };

  return (
    <Card className="w-full hover:shadow-2xl transition-all duration-300 overflow-hidden shadow-lg">
      <div className="relative">
        <MediaCarousel
          title={room.title}
          images={room.photos}
          videos={room.videos}
          className="h-48 rounded-t-lg"
        />

        <div className="absolute bottom-2 right-2 z-30">
          <Badge
            variant="outline"
            className="text-xs bg-green-50 text-green-700 border-green-200"
          >
            <IndianRupee className="w-3 h-3" />
            {room.price.toLocaleString()}
          </Badge>
        </div>

        <div className="absolute bottom-2 left-2 z-30">
          <Badge
            variant="outline"
            className="text-xs bg-green-50 text-green-700 border-green-200"
          >
            {formatFurnishingStatus(room.furnishingStatus)}
          </Badge>
        </div>

        <div className="absolute top-2 right-10 z-30 flex gap-2">
          <Share2
            className="w-6 h-6 p-0.5 text-blue-600 cursor-pointer hover:scale-110"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(
                  `https://${process.env.NEXT_PUBLIC_BASE_DOMAIN}/room/${btoa(
                    `${room.id},${room.city}`
                  )}`
                );

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
            }}
          />
        </div>

        <div className="absolute top-2 right-2 z-30 flex gap-2">
          <Trash2
            onClick={() => onRemove(id, room.id)}
            className="w-6 h-6 p-0.5 text-red-600 cursor-pointer hover:scale-110"
          />
        </div>
      </div>

      <CardContent className="p-5 space-y-4 bg-gradient-to-r from-green-50 to-emerald-50">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-lg line-clamp-2 text-gray-900 flex-1">
              {room.title}
            </h3>
          </div>

          <div className="flex items-center text-sm">
            <MapPin className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />

            <span className="truncate">
              {room.location}, {room.city}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />

            <span className="text-sm font-semibold">{room.ratings}</span>

            <span className="text-xs text-gray-500">rating</span>
          </div>

          <Badge variant="outline" className="text-xs font-medium">
            {room.roomType}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs text-gray-700 bg-gray-50 p-4 rounded-xl">
          <div className="flex items-center gap-2">
            <Bed className="w-4 h-4 text-blue-600 flex-shrink-0" />

            <span className="truncate font-medium">
              {room.bedroom} Bedroom{room.bedroom > 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Bath className="w-4 h-4 text-blue-600 flex-shrink-0" />

            <span className="truncate font-medium">
              {room.bathroom} Bathroom{room.bathroom > 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Square className="w-4 h-4 text-blue-600 flex-shrink-0" />

            <span className="truncate font-medium">
              {room.hall} Hall{room.hall > 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <ChefHat className="w-4 h-4 text-blue-600 flex-shrink-0" />

            <span className="truncate font-medium">
              {room.kitchen} Kitchen{room.kitchen > 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600 flex-shrink-0" />

            <span className="font-medium">
              {room.minCapacity}-{room.maxCapacity} person
            </span>
          </div>

          {room.direction && (
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-blue-600 flex-shrink-0" />

              <span className="font-medium">Facing {room.direction}</span>
            </div>
          )}
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-800 mb-3">
            Amenities
          </h4>

          <div className="flex flex-wrap gap-2 bg-gray-50 p-2 rounded-xl">
            {room.amenities.slice(0, 3).map((amenity, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs bg-blue-50 text-blue-700 border-blue-200"
              >
                {amenity}
              </Badge>
            ))}

            {room.amenities.length > 3 && (
              <Badge
                variant="outline"
                className="text-xs bg-gray-50 text-gray-600"
              >
                +{room.amenities.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* <div className="flex gap-3 pt-2">
          <Button
            size="sm"
            className="flex-1  bg-gradient-to-r from-green-200/75 to-emerald-200/75 shadow-lg"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </div> */}
      </CardContent>
    </Card>
  );
};

const RoomCardSkeleton: React.FC = () => {
  return (
    <Card className="w-full overflow-hidden border-0 shadow-lg bg-white animate-pulse">
      <div className="relative">
        <div className="h-48 w-full bg-gray-200 rounded-t-lg" />

        <div className="absolute top-3 right-3">
          <div className="h-6 w-16 bg-gray-200 rounded" />
        </div>
      </div>

      <CardContent className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-4 w-40 bg-gray-200 rounded" />
          <div className="h-5 w-16 bg-gray-200 rounded" />
        </div>

        <div className="h-3 w-32 bg-gray-200 rounded" />

        <div className="flex items-center justify-between">
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-4 w-14 bg-gray-200 rounded" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-4 w-24 bg-gray-200 rounded" />
          ))}

          <div className="h-4 w-40 col-span-2 bg-gray-200 rounded" />
        </div>

        <div>
          <div className="h-3 w-24 mb-2 bg-gray-200 rounded" />

          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-5 w-16 bg-gray-200 rounded" />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-3 w-24 bg-gray-200 rounded" />
        </div>

        <div className="h-10 w-full bg-gray-200 rounded" />

        <div className="h-8 w-full bg-gray-200 rounded-lg" />
      </CardContent>
    </Card>
  );
};
