"use client";

import {
  Video,
  Share2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import { useToast } from "@/app/common/hooks/use-toast";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";

interface RoomMediaSectionProps {
  id: string;
  name: string;
  photos: string[];
  verified: boolean;
  onRemove: () => void;
  videos?: string | null;
}

const RoomMediaSection: React.FC<RoomMediaSectionProps> = ({
  id,
  name,
  photos,
  videos,
  verified,
  onRemove,
}) => {
  const { toast } = useToast();

  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [showVideo, setShowVideo] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  React.useEffect(() => {
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
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  };

  return (
    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 group">
      {/* Media Display */}
      {showVideo && videos ? (
        <iframe
          allow="autoplay; encrypted-media"
          style={{ pointerEvents: "none" }}
          src={
            videos +
            "?autoplay=1&mute=1&controls=0&disablekb=1&modestbranding=1&rel=0&showinfo=0&fs=0&iv_load_policy=3"
          }
          className="w-full h-full object-cover"
        ></iframe>
      ) : (
        <div className="relative w-full h-full">
          <div className="overflow-hidden h-full" ref={emblaRef}>
            <div className="flex h-full">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 h-full relative"
                >
                  <Image
                    fill
                    src={photo}
                    sizes="100%"
                    loading="lazy"
                    alt={`${name} - ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Navigation Buttons with Better Visibility */}
          {photos.length > 1 && (
            <>
              <button
                onClick={() => emblaApi?.scrollPrev()}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 hover:text-gray-900 rounded-full h-8 w-8 flex items-center justify-center shadow-md opacity-80 hover:opacity-100 transition-all duration-200 z-20"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => emblaApi?.scrollNext()}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 hover:text-gray-900 rounded-full h-8 w-8 flex items-center justify-center shadow-md opacity-80 hover:opacity-100 transition-all duration-200 z-20"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}

          {/* Enhanced Image indicators - Now clickable and more visible */}
          {photos.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-20 bg-black/20 rounded-full px-3 py-1">
              {photos.map((_, index) => (
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

      {/* Media Controls */}
      <div className="absolute top-3 left-3 flex gap-2 z-20">
        {videos && (
          <Button
            size="sm"
            onClick={() => setShowVideo(!showVideo)}
            className="bg-black/60 hover:bg-black/80 text-white border-0 rounded-full h-8 px-3"
          >
            {showVideo ? (
              <>
                <ImageIcon className="h-3 w-3 mr-1" />
                Images
              </>
            ) : (
              <>
                <Video className="h-3 w-3 mr-1" />
                Video
              </>
            )}
          </Button>
        )}
      </div>

      {/* Verified Badge */}
      {!verified === true && (
        <div className="absolute top-2 right-2 z-20">
          <Badge className="bg-green-500 text-white">✓ Verified</Badge>
        </div>
      )}

      {/* Share Button */}
      <button
        onClick={() =>
          navigator.clipboard
            .writeText(`${window.location.origin}/room/${btoa(id)}`)
            .then(() => {
              toast({ title: "URL", description: "URL copied" });
              console.log("URL copied to clipboard!");
            })
            .catch((err) => {
              console.error("Failed to copy: ", err);
            })
        }
        className="absolute bottom-10 right-2 flex items-center justify-center text-green-600 hover:text-green-700 backdrop-blur-sm rounded-lg h-7 w-10 z-20"
      >
        <Share2 className="w-5 h-5" />
      </button>

      {/* Remove Button */}
      <button
        onClick={onRemove}
        className="absolute bottom-2 right-2 flex items-center justify-center text-red-600 hover:text-red-700 backdrop-blur-sm rounded-lg h-7 w-10 z-20"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default RoomMediaSection;
