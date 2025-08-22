import { useState } from "react";

import { FurnishingStatus, RoomAmenities } from "@/app/types/types";

export const useListingFlow = () => {
  const [isListing, setIsListing] = useState(false);

  return {
    isListing,
    setIsListing,
  };
};

export const useFurnishingFlow = () => {
  const [furnishingStatus, setFurnishingStatus] =
    useState<FurnishingStatus>("SEMIFURNISHED");

  return {
    furnishingStatus,
    setFurnishingStatus,
  };
};

export const useMediaFlow = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    removeImage,
    selectedImages,
    setSelectedImages,
    handleImageUpload,
  };
};

export const useAmenitiesFlow = () => {
  const [selectedAmenities, setSelectedAmenities] = useState<RoomAmenities[]>(
    []
  );

  const handleAmenityChange = (amenity: RoomAmenities, checked: boolean) => {
    if (checked) {
      setSelectedAmenities((prev) => [...prev, amenity]);
    } else {
      setSelectedAmenities((prev) => prev.filter((a) => a !== amenity));
    }
  };

  return {
    selectedAmenities,
    handleAmenityChange,
    setSelectedAmenities,
  };
};
