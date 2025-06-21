"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Play, Image as ImageIcon } from "lucide-react";

import { Button } from "@/app/components/ui/button";

interface ImageCarouselProps {
  roomName: string;
  photos: string[];
  showVideo: boolean;
  videos: string | null;
  onToggleVideo: (e: React.MouseEvent) => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  photos,
  videos,
  roomName,
  showVideo,
  onToggleVideo,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photos.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % photos.length);
    }
  };

  return (
    <div className="relative h-48 overflow-hidden bg-gray-100 group">
      {showVideo && videos ? (
        <iframe
          allow="autoplay; encrypted-media"
          style={{ pointerEvents: "none" }}
          className="aspect-video transition-transform duration-700"
          src={
            videos +
            "?autoplay=1&mute=1&controls=0&disablekb=1&modestbranding=1&rel=0&showinfo=0&fs=0&iv_load_policy=3"
          }
        ></iframe>
      ) : (
        <div
          className="relative w-full h-full cursor-pointer"
          onClick={handleImageClick}
        >
          <Image
            fill
            loading="lazy"
            className="object-cover"
            src={photos[currentImageIndex]}
            alt={`${roomName} - ${currentImageIndex + 1}`}
          />

          {/* Image indicators */}
          {photos.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 pointer-events-none">
              {photos.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentImageIndex
                      ? "bg-white shadow-lg"
                      : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Media controls */}
      {videos && (
        <div className="absolute top-3 right-3">
          <Button
            size="sm"
            onClick={onToggleVideo}
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

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default React.memo(ImageCarousel);
