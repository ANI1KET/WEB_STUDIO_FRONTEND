"use client";

import { Info } from "lucide-react";
import { Role } from "@prisma/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  useMediaFlow,
  useListingFlow,
  useAmenitiesFlow,
  useFurnishingFlow,
} from "./hooks";
import {
  ListedRoom,
  OwnerDetails,
  RoomWithMedia,
  RoomWithMediaUrl,
} from "@/app/types/types";
import {
  upload_Images,
  SubmitRoomDetails,
} from "../../components/list/room/ServerAction/utils";
import { useToast } from "@/app/common/hooks/use-toast";
import { upload_Video } from "../../components/list/room/utils/uploadUtils";
import { useSettingNumberVerificationFlow } from "@/app/common/hooks/account/account";

import { Button } from "@/app/components/ui/button";
import InterestOTPDialog from "@/app/common/ui/OTPDialog";
import PhoneNumberDialog from "@/app/common/ui/NumberDialog";
import RequiredInfoGuide from "@/app/components/list/room/RequiredInfoGuide";
import MediaUploadSection from "@/app/components/list/room/MediaUploadSection";
import RoomDetailsSection from "@/app/components/list/room/RoomDetailsSection";
import OwnerDetailsSection from "@/app/components/list/room/OwnerDetailsSection";
import BasicInformationSection from "@/app/components/list/room/BasicInformationSection";
import ContactDescriptionSection from "@/app/components/list/room/ContactDescriptionSection";
import AmenitiesFurnishingSection from "@/app/components/list/room/AmenitiesFurnishingSection";

const Room = () => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const number = session?.user.number;
  const userId = session?.user.userId;
  const isOwner = session?.user.role === "OWNER";

  const {
    phoneNumber,
    setPhoneNumber,
    isOTPDialogOpen,
    isPhoneDialogOpen,
    handlePhoneVerified,
    setIsPhoneDialogOpen,
    handlePhoneSubmitted,
    handleCloseOTPDialog,
    handleClosePhoneDialog,
    handleReGenerateNumberOtp,
  } = useSettingNumberVerificationFlow();
  const { isListing, setIsListing } = useListingFlow();
  const { furnishingStatus, setFurnishingStatus } = useFurnishingFlow();
  const { selectedAmenities, handleAmenityChange } = useAmenitiesFlow();
  const { selectedImages, handleImageUpload, removeImage } = useMediaFlow();

  const [showGuide, setShowGuide] = useState(false);

  const {
    watch,
    control,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomWithMedia & Partial<OwnerDetails>>();
  const videoFiles = watch("videos");
  const direction = watch("direction");
  const video = videoFiles?.[0];

  const { mutate } = useMutation({
    mutationFn: (data: RoomWithMediaUrl & Partial<OwnerDetails>) =>
      SubmitRoomDetails(data),
    onSuccess: (response: ListedRoom) => {
      queryClient.setQueryData(["CategoryDetails", "room"], response);
      setIsListing(false);
      router.push(`/listed/room/${btoa(response.id)}`);
    },
    onError: (error) => {
      setIsListing(false);
      toast({ title: "Room", description: error.message });
    },
  });

  const onSubmit = async (data: RoomWithMedia & Partial<OwnerDetails>) => {
    if (number) {
      setIsListing(true);

      data.city =
        data.city.charAt(0).toUpperCase() + data.city.slice(1).toLowerCase();
      data.location =
        data.location.charAt(0).toUpperCase() +
        data.location.slice(1).toLowerCase();

      if (isOwner) {
        data.ownerId = userId;
      }

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
          listerId: userId as string,
          postedBy: session?.user.role as Role,
          listerName: session?.user.name as string,
        });
      } catch (error) {
        console.error(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      }
    } else {
      setIsPhoneDialogOpen(true);
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

        {!isOwner && (
          <OwnerDetailsSection
            id={userId}
            errors={errors}
            register={register}
            setValue={setValue}
          />
        )}

        <MediaUploadSection
          errors={errors}
          register={register}
          selectedVideo={video}
          onRemoveImage={removeImage}
          selectedImages={selectedImages}
          onImageUpload={handleImageUpload}
        />

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

      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={() => setShowGuide(true)}
          className="bg-gradient-to-r from-green-300 to-green-400 hover:from-green-400 hover:to-green-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-5 py-3 rounded-full border-2 border-white/30"
        >
          <Info className="h-4 w-4 mr-1" />
          Listing Guide
        </Button>
      </div>

      <RequiredInfoGuide
        isOpen={showGuide}
        onClose={() => setShowGuide(false)}
      />

      {isPhoneDialogOpen && (
        <PhoneNumberDialog
          phoneNumber={phoneNumber}
          title="Required to list room"
          setPhoneNumber={setPhoneNumber}
          onClose={handleClosePhoneDialog}
          onPhoneSubmitted={handlePhoneSubmitted}
        />
      )}

      {isOTPDialogOpen && (
        <InterestOTPDialog
          phoneNumber={phoneNumber}
          onClose={handleCloseOTPDialog}
          onVerified={handlePhoneVerified}
          title="Complete verification to list room"
          reGenerateNumberOtp={handleReGenerateNumberOtp}
        />
      )}
    </div>
  );
};

export default Room;
