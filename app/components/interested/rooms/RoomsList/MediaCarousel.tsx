"use client";

import {
  Video,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";

import { Button } from "@/app/components/ui/button";

interface MediaCarouselProps {
  title: string;
  images: string[];
  videos?: string | null;
  className?: string;
}

const MediaCarousel: React.FC<MediaCarouselProps> = ({
  title,
  images,
  videos,
  className = "h-48",
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [showVideo, setShowVideo] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollToSlide = (index: number) => emblaApi?.scrollTo(index);

  const handleToggleVideo = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowVideo(!showVideo);
  };

  return (
    <div className={`relative overflow-hidden group ${className}`}>
      {showVideo && videos ? (
        <div className="relative w-full h-full">
          <iframe
            allow="autoplay; encrypted-media"
            className="w-full h-full object-cover pointer-events-none"
            src={
              videos +
              "?autoplay=1&mute=1&controls=0&disablekb=1&modestbranding=1&rel=0&showinfo=0&fs=0&iv_load_policy=3"
            }
          />
        </div>
      ) : (
        <div className="relative w-full h-full">
          <div className="overflow-hidden w-full h-full" ref={emblaRef}>
            <div className="flex h-full">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 relative h-full"
                >
                  <Image
                    fill
                    src={image}
                    sizes="100%"
                    alt={`${title} - ${index + 1}`}
                    className="object-cover transition-transform duration-300"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={() => emblaApi?.scrollPrev()}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 hover:text-gray-900 rounded-full h-8 w-8 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => emblaApi?.scrollNext()}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 hover:text-gray-900 rounded-full h-8 w-8 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-20 bg-black/20 rounded-full px-3 py-1">
                {images.map((_, index) => (
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
            </>
          )}
        </div>
      )}

      {videos && (
        <div className="absolute top-2 left-2 z-30">
          <Button
            size="sm"
            onClick={handleToggleVideo}
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
        </div>
      )}
    </div>
  );
};

export default MediaCarousel;
