"use client";

import { Phone } from "lucide-react";
import { Role } from "@prisma/client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import {
  canBook,
  canShowInterest,
  canAcessScheduleVisit,
} from "@/app/common/config/authorization";
import { RoomData } from "@/app/types/types";
import { useRoomActions } from "../[id]/hooks/RoomPageLayout";
import { useSettingNumberVerificationFlow } from "@/app/common/hooks/account/account";

import OTPDialog from "@/app/common/ui/OTPDialog";
import NumberDialog from "@/app/common/ui/NumberDialog";
import ScheduleVisitDialog from "./RoomDetailsAction/ScheduleVisitDialog";

interface RoomDetailsActionrProps {
  role: Role;
  userId: string;
  roomData: RoomData;
  isAuthenticated: boolean;
  number: string | undefined;
}

const RoomDetailsAction: React.FC<RoomDetailsActionrProps> = ({
  role,
  number,
  userId,
  roomData,
  isAuthenticated,
}) => {
  const router = useRouter();

  const { handleShare, handleCompare, handleInterest } =
    useRoomActions(roomData);

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

  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);

  const handleCall = (number: string) => {
    window.open(`tel:${number}`);
  };

  const handleInterestClick = async () => {
    if (Boolean(number)) {
      setIsPhoneDialogOpen(true);
    } else {
      await handleInterest();
    }
  };
  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex flex-col flex-wrap">
              <h1 className="text-2xl font-bold text-gray-900">
                {roomData.title}
              </h1>

              <div className="flex items-center">
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-4 h-4 mr-2"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  />
                </svg>
                {roomData.location}, {roomData.city}
              </div>
            </div>

            <div className="flex gap-3 mr-2">
              {isAuthenticated ? (
                canShowInterest({
                  userId,
                  ownerId: roomData.ownerId,
                  listerId: roomData.listerId,
                  postedBy: roomData.postedBy,
                }) && (
                  <button
                    title="Show Interest"
                    onClick={handleInterestClick}
                    className="p-2 text-red-500 hover:bg-red-50 hover:scale-105 rounded-lg transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      />
                    </svg>
                  </button>
                )
              ) : (
                <button
                  title="Show Interest"
                  onClick={() => {
                    const currentUrl = window.location.href;
                    const encodedUrl = encodeURIComponent(currentUrl);
                    router.push(`/auth/login?callbackUrl=${encodedUrl}`);
                  }}
                  className="p-2 text-red-500 hover:bg-red-50 hover:scale-105 rounded-lg transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    />
                  </svg>
                </button>
              )}

              <button
                title="Compare"
                onClick={handleCompare}
                className="p-2 text-green-500 hover:bg-green-50 hover:scale-105 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 4a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 12a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4zM11 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V4zM11 12a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                </svg>
              </button>

              <button
                title="Share"
                onClick={handleShare}
                className="p-2 text-blue-500 hover:bg-blue-50 hover:scale-105 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-4 h-4 mr-1"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {roomData.ratings} Rating
              </span>

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                {roomData.available ? "Available" : "Occupied"}
              </span>
            </div>

            <div className="text-right bg-green-50 px-4 py-1 rounded-lg border-2 border-green-200">
              <span className="text-2xl font-bold text-green-600">
                ₹&nbsp;{roomData.price.toLocaleString()}
              </span>

              <span className="text-gray-500 block text-sm text-center">
                per month
              </span>
            </div>
          </div>
        </div>

        <div className="bg-green-50 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-800">Contact Details</h3>

              <p className="text-sm">
                Listed by {roomData.postedBy} • {roomData.listerName}
              </p>
            </div>

            <button
              onClick={() => handleCall(roomData.primaryContact)}
              className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <Phone className="h-4 w-4 text-green-600" />
              +977-{roomData.primaryContact}
            </button>
          </div>
        </div>

        {isAuthenticated &&
          canBook({
            role,
            userId,
            ownerId: roomData.ownerId,
            listerId: roomData.listerId,
          }) && (
            <div className="p-2">
              <button
                // onClick={handleBookRoom}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg text-lg transition-colors flex items-center justify-center"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-5 h-5 mr-2"
                >
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                BOOK ROOM
              </button>
            </div>
          )}

        {isAuthenticated ? (
          canAcessScheduleVisit({
            userId,
            ownerId: roomData.ownerId,
            listerId: roomData.listerId,
            postedBy: roomData.postedBy,
            available: roomData.available,
          }) && (
            <div className="bg-gray-50 p-2 flex items-center justify-between border-t border-gray-100">
              <button
                onClick={() => setIsScheduleDialogOpen(true)}
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-4 h-4 mr-2"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  />
                </svg>
                SCHEDULE VISIT
              </button>
            </div>
          )
        ) : (
          <div className="bg-gray-50 p-2 flex items-center justify-between border-t border-gray-100">
            <button
              onClick={() => {
                const currentUrl = window.location.href;
                const encodedUrl = encodeURIComponent(currentUrl);
                router.push(`/auth/login?callbackUrl=${encodedUrl}`);
              }}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                className="w-4 h-4 mr-2"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                />
              </svg>
              SCHEDULE VISIT
            </button>
          </div>
        )}
      </div>

      {isPhoneDialogOpen && (
        <NumberDialog
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          onClose={handleClosePhoneDialog}
          onPhoneSubmitted={handlePhoneSubmitted}
          title="Required to show interest in this room"
        />
      )}

      {isOTPDialogOpen && (
        <OTPDialog
          phoneNumber={phoneNumber}
          onClose={handleCloseOTPDialog}
          onVerified={handlePhoneVerified}
          title="Complete verification to show interest"
          reGenerateNumberOtp={handleReGenerateNumberOtp}
        />
      )}

      <ScheduleVisitDialog
        id={roomData.id}
        city={roomData.city}
        title={roomData.title}
        price={roomData.price}
        location={roomData.location}
        isOpen={isScheduleDialogOpen}
        listerName={roomData.listerName}
        primaryContact={roomData.primaryContact}
        onClose={() => setIsScheduleDialogOpen(false)}
      />
    </>
  );
};

export default React.memo(RoomDetailsAction);
