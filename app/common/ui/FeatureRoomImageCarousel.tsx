"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, User } from "lucide-react";

import { RoomData } from "@/app/types/types";

const FeatureRoomImageCarousel: React.FC<{ room: RoomData }> = ({ room }) => {
  const photos = room.photos;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % photos.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + photos.length) % photos.length);
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

export default FeatureRoomImageCarousel;
