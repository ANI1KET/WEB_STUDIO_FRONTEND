"use client";

import React from "react";
import Image from "next/image";

interface RoomImageModalProps {
  title: string;
  isOpen: boolean;
  photos: string[];
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
  currentImageIndex: number;
}

const RoomImageModal: React.FC<RoomImageModalProps> = ({
  title,
  isOpen,
  photos,
  onNext,
  onPrev,
  onClose,
  currentImageIndex,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
      <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
        <Image
          fill
          priority
          src={photos[currentImageIndex]}
          className="object-contain rounded-lg"
          alt={`${title} - Full view ${currentImageIndex + 1}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 80vw"
        />
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/20 hover:bg-white/30 text-white"
        >
          &lt;
        </button>
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/20 hover:bg-white/30 text-white"
        >
          &gt;
        </button>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 text-white"
        >
          ✕
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <span className="bg-black/60 text-white px-3 py-1 rounded">
            {currentImageIndex + 1} of {photos.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RoomImageModal);
