"use client";

import Image from "next/image";
import React, { useState, useCallback, memo } from "react";
import { ChevronLeft, ChevronRight, Eye, Play } from "lucide-react";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";

interface OptimizedRoomGalleryProps {
  title: string;
  photos: string[];
  videos: string | null;
  onImageModalOpen: (index: number) => void;
}

const OptimizedRoomGallery: React.FC<OptimizedRoomGalleryProps> = ({
  title,
  photos,
  videos,
  onImageModalOpen,
}) => {
  const [showVideo, setShowVideo] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const handleThumbnailClick = useCallback((index: number) => {
    setShowVideo(false);
    setCurrentImageIndex(index);
  }, []);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  return (
    <div className="relative group w-full">
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-gray-100">
        {showVideo && videos ? (
          <iframe
            allowFullScreen={false}
            allow="autoplay; encrypted-media"
            style={{ pointerEvents: "none" }}
            src={
              videos +
              "?autoplay=1&mute=1&controls=0&disablekb=1&modestbranding=1&rel=0&showinfo=0&fs=0&iv_load_policy=3"
            }
            className="absolute inset-0 w-full h-full"
          ></iframe>
        ) : (
          <div className="relative w-full h-full">
            <Image
              fill
              loading="eager"
              src={photos[currentImageIndex]}
              priority={!showVideo && currentImageIndex === 0}
              alt={`${title} - Image ${currentImageIndex + 1}`}
              onClick={() => onImageModalOpen(currentImageIndex)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
              className="w-full h-full object-cover transition-all duration-300 cursor-pointer"
            />

            <div className="absolute inset-y-1/2 inset-x-4 flex items-center justify-between pointer-events-none">
              <Button
                size="sm"
                onClick={prevImage}
                className="pointer-events-auto h-10 w-10 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-lg transition-all duration-200"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <Button
                size="sm"
                onClick={nextImage}
                className="pointer-events-auto h-10 w-10 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-lg transition-all duration-200"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="absolute bottom-4 left-4">
              <Badge className="bg-black/60 text-white">
                {currentImageIndex + 1} / {photos.length}
              </Badge>
            </div>
          </div>
        )}

        <div className="absolute top-4 left-4 flex gap-2">
          {videos && (
            <Button
              size="sm"
              onClick={() => setShowVideo(!showVideo)}
              className="bg-black/60 text-white hover:bg-black/80"
            >
              {showVideo ? (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Photos
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Video
                </>
              )}
            </Button>
          )}
          <Button
            size="sm"
            onClick={() => onImageModalOpen(currentImageIndex)}
            className="bg-black/60 text-white hover:bg-black/80"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Large
          </Button>
        </div>
      </div>

      <div className="p-1 bg-gray-50 border-t">
        <div className="flex overflow-x-auto">
          {photos.map((photo, index) => (
            <div
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`m-2 relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                currentImageIndex === index
                  ? "ring-2 ring-green-500 ring-offset-2"
                  : "hover:ring-2 hover:ring-green-300 grayscale-[50%] hover:grayscale-0"
              }`}
            >
              <Image
                fill
                src={photo}
                sizes="80px"
                loading="lazy"
                className="object-cover"
                alt={`Thumbnail ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(OptimizedRoomGallery);
