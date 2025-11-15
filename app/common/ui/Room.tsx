"use client";

import {
  Home,
  User,
  Users,
  Video,
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import React, { memo, useState, useEffect } from "react";

import { RoomData } from "@/app/types/types";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardFooter } from "@/app/components/ui/card";
import { useRoomActions } from "@/app/components/selected/room/[id]/hooks/RoomPageLayout";

interface RoomCardProps {
  room: RoomData;
}

const RoomCard = memo(({ room }: RoomCardProps) => {
  const router = useRouter();
  const { handleCompare } = useRoomActions(room);

  const [showVideo, setShowVideo] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollToSlide = (index: number) => {
    emblaApi?.scrollTo(index);
  };

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
    <Card className="w-[306px] shadow-xl bg-white/95 backdrop-blur-sm border-t border-l border-white/40">
      <div className="w-[306px] relative rounded-t-xl overflow-hidden group">
        {showVideo && room.videos ? (
          <div className="relative w-full aspect-video">
            <iframe
              allow="autoplay; encrypted-media"
              className="w-full h-full object-cover"
              src={
                room.videos +
                "?autoplay=1&mute=1&controls=0&disablekb=1&modestbranding=1&rel=0&showinfo=0&fs=0&iv_load_policy=3"
              }
            />

            <div
              className="absolute inset-0 z-10"
              style={{ pointerEvents: "auto" }}
            />
          </div>
        ) : (
          <div className="overflow-hidden w-full aspect-video" ref={emblaRef}>
            <div className="flex h-full">
              {room.photos.map((photo, index) => (
                <div
                  key={index}
                  style={{ height: "100%" }}
                  className="flex-[0_0_100%] min-w-0 relative"
                >
                  <Image
                    fill
                    src={photo}
                    sizes="100%"
                    loading="lazy"
                    alt={`${room.title} - image ${index + 1}`}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>

            {room.photos.length > 1 && (
              <>
                <button
                  onClick={() => emblaApi?.scrollPrev()}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 hover:text-gray-900 rounded-full h-8 w-8 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 z-20"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => emblaApi?.scrollNext()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 hover:text-gray-900 rounded-full h-8 w-8 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 z-20"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}

            {room.photos.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-black/20 rounded-full px-3 py-1">
                {room.photos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === selectedIndex
                        ? "bg-white scale-125 shadow-sm"
                        : "bg-white/60 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {room.videos && (
          <div className="absolute top-3 left-3 z-20">
            <Button
              size="sm"
              onClick={() => setShowVideo(!showVideo)}
              className="bg-black/60 hover:bg-black/80 text-white border-0 rounded-full h-8 px-3"
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
            </Button>
          </div>
        )}

        <div className="absolute top-2 right-2 flex flex-col gap-1 z-20">
          <Badge
            className={`${
              room.available ? "bg-green-600" : "bg-red-600"
            } shadow-lg text-xs`}
          >
            {room.available ? "Available" : "Occupied"}
          </Badge>
        </div>

        <div className="absolute bottom-2 right-2 flex flex-col gap-1 z-20">
          <button
            title="Add to Compare List"
            onClick={handleCompare}
            className="p-1 text-green-400 hover:bg-green-50 hover:scale-105 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 12a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4zM11 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V4zM11 12a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
            </svg>
          </button>
        </div>
      </div>

      <CardContent className="px-3 py-2">
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
          onClick={() => router.push(`/room/${btoa(room.id)}`)}
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
