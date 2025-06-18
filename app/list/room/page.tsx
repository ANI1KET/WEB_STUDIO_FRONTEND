"use client";

import { toast } from "sonner";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FurnishingStatusEnum, Role } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  RoomAmenities,
  RoomWithMedia,
  RoomWithMediaUrl,
} from "@/app/types/types";
import { upload_Video } from "../../components/list/room/utils/uploadUtils";
import {
  SubmitRoomDetails,
  upload_Images,
} from "../../components/list/room/serverAction/utils";

import { Button } from "@/app/components/ui/button";
import MediaUploadSection from "@/app/components/list/room/MediaUploadSection";
import RoomDetailsSection from "@/app/components/list/room/RoomDetailsSection";
import BasicInformationSection from "@/app/components/list/room/BasicInformationSection";
import ContactDescriptionSection from "@/app/components/list/room/ContactDescriptionSection";
import AmenitiesFurnishingSection from "@/app/components/list/room/AmenitiesFurnishingSection";

const Room = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const [isListing, setIsListing] = useState(false);
  const [furnishingStatus, setFurnishingStatus] =
    useState<FurnishingStatusEnum>("SEMIFURNISHED");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<RoomAmenities[]>(
    []
  );

  const {
    watch,
    control,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomWithMedia>();
  const videoFiles = watch("videos");
  const direction = watch("direction");
  const video = videoFiles?.[0];

  const handleAmenityChange = (amenity: RoomAmenities, checked: boolean) => {
    if (checked) {
      setSelectedAmenities((prev) => [...prev, amenity]);
    } else {
      setSelectedAmenities((prev) => prev.filter((a) => a !== amenity));
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const { mutate } = useMutation({
    mutationFn: (data: RoomWithMediaUrl) => SubmitRoomDetails(data),
    onSuccess: (response) => {
      queryClient.setQueryData(["CategoryDetails", "room"], response);
      setIsListing(false);
      router.push(`/listed/room/${btoa(response.id)}`);
    },
    onError: (error) => {
      setIsListing(false);
      toast.error(error.message);
    },
  });

  const onSubmit = async (data: RoomWithMedia) => {
    setIsListing(true);

    data.city =
      data.city.charAt(0).toUpperCase() + data.city.slice(1).toLowerCase();
    data.location =
      data.location.charAt(0).toUpperCase() +
      data.location.slice(1).toLowerCase();

    try {
      const [uploadVideoUrl, uploadImageUrls] = await Promise.allSettled([
        upload_Video(data.videos),
        upload_Images("room", selectedImages),
      ]);

      const ImageUrls =
        uploadImageUrls.status === "fulfilled" ? uploadImageUrls.value : [];
      const VideoUrl =
        uploadVideoUrl.status === "fulfilled" && uploadVideoUrl.value
          ? `https://www.youtube.com/embed/${uploadVideoUrl.value}`
          : null;

      mutate({
        ...data,
        furnishingStatus,
        photos: ImageUrls,
        videos: VideoUrl ?? null,
        listerId: session?.user.id as string,
        postedBy: session?.user.role as Role,
      });
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  return (
    <div className="max-w-4xl container mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
          List Your Dream Room
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Create an attractive listing and connect with potential tenants
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <BasicInformationSection
          errors={errors}
          control={control}
          register={register}
        />

        <RoomDetailsSection
          errors={errors}
          setValue={setValue}
          register={register}
          getValues={getValues}
          direction={direction ?? ""}
        />

        <AmenitiesFurnishingSection
          furnishingStatus={furnishingStatus}
          selectedAmenities={selectedAmenities}
          onAmenityChange={handleAmenityChange}
          onFurnishingStatusChange={setFurnishingStatus}
        />

        <ContactDescriptionSection errors={errors} register={register} />

        <MediaUploadSection
          errors={errors}
          register={register}
          selectedVideo={video}
          onRemoveImage={removeImage}
          selectedImages={selectedImages}
          onImageUpload={handleImageUpload}
        />

        {/* Submit Button */}
        <div className="flex justify-center pb-6">
          <Button
            size="lg"
            type="submit"
            asChild={true}
            disabled={isListing}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-full border-0 min-w-[200px]"
          >
            {isListing ? "Listing room..." : "🏠 List Room"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Room;
