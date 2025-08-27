"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { MapPin, ChevronLeft, ChevronRight, User } from "lucide-react";

import { RoomData } from "@/app/types/types";
import { getAmenityIcon } from "@/app/common/icon/amenities";

import {
  Carousel,
  CarouselItem,
  CarouselContent,
  type CarouselApi,
} from "@/app/components/ui/carousel";
import { Card, CardContent } from "@/app/components/ui/card";

interface FeaturedRoomsSectionProps {
  featuredRooms: RoomData[];
}

const FeaturedRoomsSection: React.FC<FeaturedRoomsSectionProps> = ({
  featuredRooms,
}) => {
  const router = useRouter();
  const AUTOPLAY_DELAY = 2000;
  const [api, setApi] = React.useState<CarouselApi>();
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;
    const id = window.setInterval(() => {
      if (!isHovered) {
        api.scrollPrev();
      }
    }, AUTOPLAY_DELAY);
    return () => window.clearInterval(id);
  }, [api, isHovered]);

  const randomStartIndex = useMemo(() => {
    return Math.floor(Math.random() * featuredRooms.length);
  }, [featuredRooms.length]);

  if (featuredRooms.length === 0) {
    return null;
  }

  const RoomImageCarousel: React.FC<{ room: RoomData }> = ({ room }) => {
    const photos = room.photos;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
      setCurrentImageIndex((prev) => (prev + 1) % photos.length);
    };

    const prevImage = () => {
      setCurrentImageIndex(
        (prev) => (prev - 1 + photos.length) % photos.length
      );
    };

    return (
      <div className="h-36 relative overflow-hidden flex-shrink-0 group/image bg-gray-100">
        <Image
          fill
          sizes="100%"
          loading="lazy"
          src={photos[currentImageIndex]}
          alt={`${room.title} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {photos.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-200"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-200"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </>
        )}

        {photos.length > 1 && (
          <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full">
            {currentImageIndex + 1}/{photos.length}
          </div>
        )}

        <div className="absolute top-1.5 left-1.5 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-bold text-gray-800">
          {room.roomType}
        </div>

        <div className="absolute bottom-1.5 right-1.5 bg-emerald-600/95 backdrop-blur-sm px-2 py-0.5 rounded-full text-[9px] font-medium text-white flex items-center gap-1">
          <User className="w-2.5 h-2.5" />
          {room.postedBy}
        </div>

        <div className="absolute top-1.5 right-1.5 bg-green-600/95 backdrop-blur-sm px-2 py-0.5 rounded-full text-white font-bold text-[12px]">
          ₹ {Math.floor(room.price / 1000)}k
        </div>
      </div>
    );
  };

  return (
    <section className="h-full flex flex-col p-4 bg-gradient-to-br from-green-50 via-green-100 to-emerald-50 relative overflow-hidden rounded-3xl">
      <div className="relative z-10 flex flex-col h-full">
        <div className="text-center flex-shrink-0 mb-2">
          <h2 className="text-lg md:text-xl font-bold">
            <span className="bg-gradient-to-r from-green-800 via-emerald-700 to-green-800 bg-clip-text text-transparent drop-shadow-sm">
              Featured Rooms
            </span>
          </h2>
        </div>

        <div
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
          className="relative flex-1"
        >
          <Carousel
            setApi={setApi}
            orientation="vertical"
            opts={{
              loop: true,
              duration: 25,
              align: "start",
              dragFree: false,
              skipSnaps: true,
              watchDrag: true,
              direction: "ltr",
              watchResize: true,
              containScroll: "trimSnaps",
              startIndex: randomStartIndex,
            }}
            className="w-full h-full group"
          >
            <CarouselContent className="h-[1080px]">
              {featuredRooms.map((room, index) => (
                <CarouselItem key={room.id + index} className="basis-1/3">
                  <Card className="flex flex-col h-[340px] group hover:shadow-xl transition-all duration-300 border border-white/20 overflow-hidden rounded-2xl bg-white/95 backdrop-blur-sm shadow-md cursor-pointer transform">
                    <RoomImageCarousel room={room} />

                    <CardContent className="p-2 space-y-1 flex-1 flex flex-col justify-between">
                      <div>
                        <h3
                          className="font-bold text-gray-900 text-sm leading-tight line-clamp-1"
                          title={room.title}
                        >
                          {room.title}
                        </h3>

                        <div className="flex items-center gap-1 text-[11px] text-gray-600 mb-2">
                          <MapPin className="w-3 h-3 text-green-500 flex-shrink-0" />
                          <span
                            className="font-medium truncate"
                            title={`${room.location}, ${room.city}`}
                          >
                            {room.location}, {room.city}
                          </span>
                        </div>

                        <div className="grid grid-cols-4 gap-1 text-[9px]">
                          <div className="bg-purple-50 rounded p-0.5 text-center">
                            <span className="text-purple-600 block font-semibold">
                              {room.bedroom}
                            </span>

                            <span className="text-purple-500 text-[8px]">
                              Bedroom
                            </span>
                          </div>

                          <div className="bg-purple-50 rounded p-0.5 text-center">
                            <span className="text-purple-600 block font-semibold">
                              {room.hall}
                            </span>

                            <span className="text-purple-500 text-[8px]">
                              Hall
                            </span>
                          </div>

                          <div className="bg-purple-50 rounded p-0.5 text-center">
                            <span className="text-purple-600 block font-semibold">
                              {room.kitchen}
                            </span>

                            <span className="text-purple-500 text-[8px]">
                              Kitchen
                            </span>
                          </div>

                          <div className="bg-purple-50 rounded p-0.5 text-center">
                            <span className="text-purple-600 block font-semibold">
                              {room.bathroom}
                            </span>

                            <span className="text-purple-500 text-[8px]">
                              Bath
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-1 text-[9px]">
                        <div className="bg-teal-50 rounded p-0.5">
                          <span className="text-teal-600 block text-[8px]">
                            Furnishing
                          </span>

                          <span className="font-semibold text-teal-600 truncate block">
                            {room.furnishingStatus}
                          </span>
                        </div>

                        <div className="bg-teal-50 rounded p-0.5">
                          <span className="text-teal-600 block text-[8px]">
                            Capacity
                          </span>

                          <span className="font-semibold text-teal-600 truncate block">
                            {room.minCapacity}-{room.maxCapacity}
                          </span>
                        </div>
                      </div>

                      {room.amenities && room.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {room.amenities
                            .slice(0, 3)
                            .map((amenity, index: number) => (
                              <div
                                key={index}
                                className="flex items-center gap-0.5 bg-green-50 text-green-700 px-1.5 py-0.5 rounded text-[10px] font-medium"
                              >
                                {getAmenityIcon(amenity, 10)}
                                <span className="truncate">{amenity}</span>
                              </div>
                            ))}
                          {room.amenities.length > 3 && (
                            <div className="bg-gray-50 text-gray-600 px-1.5 py-0.5 rounded text-[8px] font-medium">
                              +{room.amenities.length - 3}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="mt-auto">
                        <button
                          onClick={() =>
                            router.push(
                              `/room/${btoa(`${room.id},${room.city}`)}`
                            )
                          }
                          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-1.5 px-2 rounded-lg font-semibold text-[11px] hover:shadow-lg transition-all duration-200"
                        >
                          <span className="flex items-center justify-center gap-1">
                            <span>View Details</span>
                            <svg
                              className="w-2.5 h-2.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </span>
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            <button
              onClick={() => {
                api?.scrollPrev();
              }}
              className={`absolute -top-2 left-1/2 -translate-x-1/2 z-30 transition-all duration-300 bg-emerald-600/90 hover:bg-emerald-700 border border-emerald-500/50 hover:border-emerald-400 text-white backdrop-blur-sm shadow-lg w-8 h-8 rounded-full hover:scale-110 flex items-center justify-center ${
                isHovered
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 15l-7-7-7 7"
                />
              </svg>
            </button>

            <button
              onClick={() => {
                api?.scrollNext();
              }}
              className={`absolute -bottom-2 left-1/2 -translate-x-1/2 z-30 transition-all duration-300 bg-emerald-600/90 hover:bg-emerald-700 border border-emerald-500/50 hover:border-emerald-400 text-white backdrop-blur-sm shadow-lg w-8 h-8 rounded-full hover:scale-110 flex items-center justify-center ${
                isHovered
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 9l7 7 7-7"
                />
              </svg>
            </button>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRoomsSection;
