"use client";

import {
  Home,
  User,
  Users,
  Video,
  MapPin,
  Calendar,
  Image as ImageIcon,
} from "lucide-react";
import { memo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { RoomData } from "@/app/types/types";

import {
  Carousel,
  CarouselItem,
  CarouselNext,
  CarouselContent,
  CarouselPrevious,
} from "@/app/components/ui/carousel";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardFooter } from "@/app/components/ui/card";

interface RoomCardProps {
  room: RoomData;
  showVideo: boolean;
  setShowVideo: (id: string, show: boolean) => void;
}

const RoomCard = memo(({ room, showVideo, setShowVideo }: RoomCardProps) => {
  const router = useRouter();

  const getPostedByColor = (postedBy: string) => {
    switch (postedBy) {
      case "ADMIN":
        return "bg-[#E6C200]";
      case "OWNER":
        return "bg-indigo-600";
      case "BROKER":
        return "bg-purple-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <Card className="w-[320px] shadow-xl bg-white/95 backdrop-blur-sm border-t border-l border-white/40">
      <div className="w-[320px] relative rounded-t-xl overflow-hidden group">
        {showVideo && room.videos ? (
          <iframe
            allow="autoplay; encrypted-media"
            style={{ pointerEvents: "none" }}
            src={
              room.videos +
              "?autoplay=1&mute=1&controls=0&disablekb=1&modestbranding=1&rel=0&showinfo=0&fs=0&iv_load_policy=3"
            }
            className="aspect-video transition-transform duration-700"
          ></iframe>
        ) : (
          <Carousel>
            <CarouselContent>
              {room.photos.map((photo, index) => (
                <CarouselItem key={index} className="relative aspect-video">
                  <Image
                    fill
                    src={photo}
                    sizes="100%"
                    loading="lazy"
                    alt={`${room.title} - image ${index + 1}`}
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity z-30">
              <CarouselPrevious className="relative left-0 transform-none rounded-full bg-black/50 hover:bg-black/70 h-7 w-7 md:h-8 md:w-8" />
              <CarouselNext className="relative right-0 transform-none rounded-full bg-black/50 hover:bg-black/70 h-7 w-7 md:h-8 md:w-8" />
            </div>

            {/* <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-20">
              {room.media.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === 0 ? "w-4 bg-white" : "w-1.5 bg-white/50"
                  }`}
                ></div>
              ))}
            </div> */}
          </Carousel>
        )}

        <div className="absolute top-2 right-2 flex flex-col gap-1 z-10">
          {room.verified && (
            <Badge className="bg-green-600 shadow-lg text-xs">Verified</Badge>
          )}
          <Badge
            className={`${
              room.available ? "bg-green-600" : "bg-red-600"
            } shadow-lg text-xs`}
          >
            {room.available ? "Available" : "Occupied"}
          </Badge>
        </div>

        <div className="absolute top-2 left-2 z-10">
          {room.videos && (
            <Badge
              variant="outline"
              className="bg-black/50 text-white border-none cursor-pointer shadow-lg hover:bg-black/70 text-xs"
              onClick={() => setShowVideo(room.id, !showVideo)}
            >
              {showVideo ? (
                <>
                  <ImageIcon className="h-3 w-3 mr-1" /> Images
                </>
              ) : (
                <>
                  <Video className="h-3 w-3 mr-1" /> Video
                </>
              )}
            </Badge>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      <CardContent className="py-2">
        <h3 className="font-semibold text-base sm:text-lg mb-2 text-gray-800 line-clamp-2">
          {room.title}
        </h3>

        <div className="flex items-center text-gray-500 text-xs sm:text-sm mb-3">
          <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1 text-green-600" />
          {room.location}, {room.city}
        </div>

        <div className="flex justify-between items-center mb-3">
          <p className="font-bold text-base sm:text-lg text-green-600">
            ₹{room.price.toLocaleString()}/month
          </p>
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
            <span>
              {room.minCapacity} - {room.maxCapacity}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 mb-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center text-gray-600">
              <Home className="h-3 w-3 mr-1 text-green-600" />
              <span>{room.roomType}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="h-3 w-3 mr-1 text-blue-600" />
              <span>{room.furnishingStatus}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Badge
            className={`${getPostedByColor(
              room.postedBy
            )} text-white text-xs px-3 py-1`}
          >
            <User className="h-3 w-3 mr-1" />
            {room.postedBy}
          </Badge>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          variant="outline"
          onClick={() =>
            router.push(`/room/${btoa(`${room.id},${room.city}`)}`)
          }
          className="w-full border-green-200 text-green-600 hover:text-green-700 hover:bg-green-50 shadow-sm text-sm sm:text-base"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
});

RoomCard.displayName = "RoomCard";
export default RoomCard;
