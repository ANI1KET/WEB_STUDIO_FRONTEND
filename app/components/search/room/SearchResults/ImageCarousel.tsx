"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Play, Image as ImageIcon } from "lucide-react";

import { Button } from "@/app/components/ui/button";

interface ImageCarouselProps {
  photos: string[];
  roomTitle: string;
  videos: string | null;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  photos,
  videos,
  roomTitle,
}) => {
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

  return (
    <div className="relative w-full aspect-video overflow-hidden bg-gray-100 group rounded-lg">
      {showVideo && videos ? (
        <iframe
          allow="autoplay; encrypted-media"
          className="w-full h-full object-cover"
          src={
            videos +
            "?autoplay=1&mute=1&controls=0&disablekb=1&modestbranding=1&rel=0&showinfo=0&fs=0&iv_load_policy=3"
          }
        ></iframe>
      ) : (
        <div className="overflow-hidden h-full" ref={emblaRef}>
          <div className="flex h-full">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] relative h-full min-w-0"
              >
                <Image
                  fill
                  src={photo}
                  loading="lazy"
                  alt={`${roomTitle} - ${index + 1}`}
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          {photos.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20 pointer-events-none">
              {photos.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === selectedIndex
                      ? "bg-white shadow-lg scale-125"
                      : "bg-white/50"
                  }`}
                  onClick={() => scrollToSlide(index)}
                />
              ))}
            </div>
          )}

          {photos.length > 1 && (
            <>
              <button
                onClick={() => emblaApi?.scrollPrev()}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full h-7 w-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-30"
              >
                &#8249;
              </button>
              <button
                onClick={() => emblaApi?.scrollNext()}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full h-7 w-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-30"
              >
                &#8250;
              </button>
            </>
          )}
        </div>
      )}

      {videos && (
        <div className="absolute top-3 right-3 z-20">
          <Button
            size="sm"
            onClick={() => setShowVideo((prev) => !prev)}
            className="bg-black/60 hover:bg-black/80 text-white border-0 rounded-full h-8 w-8 p-0"
          >
            {showVideo ? (
              <ImageIcon className="h-3 w-3" />
            ) : (
              <Play className="h-3 w-3" />
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default React.memo(ImageCarousel);
