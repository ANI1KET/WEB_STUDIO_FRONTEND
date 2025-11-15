"use client";

import { Star } from "lucide-react";
import React, { useMemo } from "react";

import { RoomData } from "@/app/types/types";

import {
  Carousel,
  CarouselContent,
  type CarouselApi,
} from "@/app/components/ui/carousel";
import FeatureRoomCard from "@/app/common/ui/FeatureRoomCard";

interface FeaturedRoomsSectionProps {
  height: string;
  featuredRooms: RoomData[];
}

const FeaturedRoomsSection: React.FC<FeaturedRoomsSectionProps> = ({
  height,
  featuredRooms,
}) => {
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

  return (
    <section className="flex flex-col p-2 px-4 bg-gradient-to-br from-green-50 via-green-100 to-emerald-50 relative overflow-hidden rounded-3xl">
      <div className="relative z-10 flex flex-col">
        <span className="flex items-center justify-center gap-2 text-green-600 text-lg md:text-xl font-bold mb-2">
          <Star className="w-5 h-5 text-yellow-400" />
          Featured Rooms
        </span>

        <div
          className="relative flex-1"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Carousel
            setApi={setApi}
            className="group"
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
          >
            <CarouselContent className={height}>
              {featuredRooms.map((room, index) => (
                <FeatureRoomCard room={room} key={room.id + index} />
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
