"use client";

import React from "react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";

import {
  useRoomActions,
  useRoomDetails,
  useImageModalControl,
} from "./hooks/RoomPageLayout";
import { amenityIcons } from "./icons/RoomPageLayout";

import RoomImageModal from "./RoomPageLayout/RoomImageModal";
import RoomDetailsMain from "./RoomPageLayout/RoomDetailsMain";
import RoomAmenitiesLayout from "./RoomPageLayout/RoomAmenities";
import RoomDetailsAction from "./RoomPageLayout/RoomDetailsHeader";
import OptimizedRoomGallery from "./RoomPageLayout/OptimizedRoomGallery";

interface RoomLayoutProps {
  city: string;
  roomId: string;
}

const RoomLayout: React.FC<RoomLayoutProps> = ({ city, roomId }) => {
  const { data: session } = useSession();

  const finalRoomDetails = useRoomDetails(city, roomId);

  const { open, next, prev, close, isOpen, currentIndex } =
    useImageModalControl(finalRoomDetails.photos.length);
  const {
    handleShare,
    handleCompare,
    handleInterest,
    handleContactVerification,
  } = useRoomActions();

  return (
    <div className="bg-gray-50/50 min-h-[calc(100vh-4rem)] font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="overflow-hidden shadow-2xl border border-green-100/50 rounded-3xl bg-white/95 backdrop-blur-sm hover:shadow-green-200/40">
            <OptimizedRoomGallery
              onImageModalOpen={open}
              name={finalRoomDetails.name}
              videos={finalRoomDetails.videos}
              photos={finalRoomDetails.photos}
            />
          </div>

          <RoomDetailsAction
            onShare={handleShare}
            onCompare={handleCompare}
            onInterest={handleInterest}
            user={session?.user as User}
            name={finalRoomDetails.name}
            city={finalRoomDetails.city}
            price={finalRoomDetails.price}
            ratings={finalRoomDetails.ratings}
            location={finalRoomDetails.location}
            verified={finalRoomDetails.verified}
            available={finalRoomDetails.available}
            verifyContact={handleContactVerification}
            ownerContact={finalRoomDetails.ownerContact}
            primaryContact={finalRoomDetails.primaryContact}
          />

          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-100/50 overflow-hidden hover:shadow-green-200/40">
            <RoomDetailsMain
              hall={finalRoomDetails.hall}
              bedroom={finalRoomDetails.bedroom}
              kitchen={finalRoomDetails.kitchen}
              bathroom={finalRoomDetails.bathroom}
              roomType={finalRoomDetails.roomType}
              createdAt={finalRoomDetails.createdAt}
              updatedAt={finalRoomDetails.updatedAt}
              direction={finalRoomDetails.direction}
              description={finalRoomDetails.description}
              minCapacity={finalRoomDetails.minCapacity}
              maxCapacity={finalRoomDetails.maxCapacity}
              furnishingStatus={finalRoomDetails.furnishingStatus}
            />
          </div>

          <RoomAmenitiesLayout
            amenityIcons={amenityIcons}
            amenities={finalRoomDetails.amenities}
          />

          {/* <div
            className="bg-gradient-to-r from-white/95 to-green-50/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-200/50 overflow-hidden hover:shadow-green-200/40"
            >
            <RoomPremiumSection
              className="p-6"
              roomId={room.id}
              isOwner={!!isOwner}
              roomTitle={room.name}
              ownerId={room.ownerId}
              ratings={room.ratings}
              postedBy={room.postedBy}
              verified={room.verified}
              available={room.available}
              ownerContact={room.ownerContact}
              isAuthenticated={isAuthenticated}
              getPostedByColor={getPostedByColor}
              primaryContact={room.primaryContact}
            />
          </div> */}
        </div>
      </div>

      {/* <div className="bg-gradient-to-r from-green-50/80 via-white/50 to-green-50/80 border-t border-green-200/30 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NearbyRoomsSection
            city={room.city}
            navigate={navigate}
            nearbyRooms={nearbyRooms}
            activeVideoRoomId={activeVideoRoomId}
            handleToggleVideo={handleToggleVideo}
          />
        </div>
      </div> */}

      <RoomImageModal
        onNext={next}
        onPrev={prev}
        onClose={close}
        isOpen={isOpen}
        photos={finalRoomDetails.photos}
        roomName={finalRoomDetails.name}
        currentImageIndex={currentIndex}
      />
    </div>
  );
};

export default RoomLayout;
