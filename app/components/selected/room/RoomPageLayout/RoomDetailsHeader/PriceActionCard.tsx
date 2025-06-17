"use client";

import { User } from "next-auth";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Share, GitCompare } from "lucide-react";

import { Button } from "@/app/components/ui/button";
import { toast } from "sonner";

interface PriceActionCardProps {
  user: User;
  price: number;
  onShare: () => void;
  onCompare: () => void;
  onShowInterest: () => void;
  verifyContact: (phoneNumber: string) => Promise<void>;
}

const PriceActionCard: React.FC<PriceActionCardProps> = ({
  user,
  price,
  onShare,
  onCompare,
  verifyContact,
  onShowInterest,
}) => {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);

  const handleInterestClick = () => {
    if (!user.number) {
      setIsPhoneDialogOpen(true);
    } else {
      onShowInterest();
    }
  };

  const handlePhoneSubmit = async () => {
    if (phoneNumber.length !== 10) return toast.error("Enter correct number");

    await verifyContact(phoneNumber);
    setIsPhoneDialogOpen(false);
    setPhoneNumber("");
    onShowInterest();
  };

  return (
    <div className="lg:min-w-[340px] bg-gradient-to-br from-white via-green-50/30 to-white group">
      {/* Price Display */}
      <div className="text-center mb-6 p-4 bg-white/50 rounded-2xl border border-green-100 shadow-sm backdrop-blur-xl hover:shadow-2xl transition-all duration-500">
        <div className="text-5xl font-extrabold bg-gradient-to-r from-green-600 via-emerald-500 to-green-500 bg-clip-text text-transparent my-1 tracking-tighter">
          ₹ {price.toLocaleString()}
        </div>
        <div className="text-gray-500 text-sm font-medium">per month</div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <Button
          size="lg"
          onClick={
            user ? handleInterestClick : () => router.push("/auth/login")
          }
          className="w-full bg-gradient-to-r from-green-300 to-emerald-400 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] active:scale-100 font-bold"
        >
          <div className="p-2 bg-white/20 rounded-2xl group-hover:bg-white/30 transition-colors">
            <Heart className="h-5 w-5 text-white" />
          </div>
          <span className="ml-2 relative">
            {user ? (
              "I'm Interested"
            ) : (
              <>
                <span className="block group-hover:hidden">
                  I&apos;m Interested
                </span>
                <span className="hidden group-hover:block">
                  Login to proceed
                </span>
              </>
            )}
          </span>
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <Button
            size="lg"
            variant="ghost"
            onClick={onShare}
            className="w-full bg-gradient-to-r from-green-300 to-emerald-400 hover:shadow-xl transition-all duration-300 hover:scale-[1.03] active:scale-100 font-semibold"
          >
            <div className="p-2 bg-green-100 rounded-2xl group-hover:bg-green-200 transition-colors">
              <Share className="h-4 w-4 text-green-600" />
            </div>
            Share
          </Button>

          <Button
            size="lg"
            variant="ghost"
            onClick={onCompare}
            className="w-full bg-gradient-to-r from-green-300 to-emerald-400 hover:shadow-xl transition-all duration-300 hover:scale-[1.03] active:scale-100 font-semibold"
          >
            <div className="p-2 bg-green-100 rounded-2xl group-hover:bg-green-200 transition-colors">
              <GitCompare className="h-4 w-4 text-green-600" />
            </div>
            Compare
          </Button>
        </div>
      </div>

      {/* Phone Number Dialog */}
      {isPhoneDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-white border border-green-100 rounded-2xl shadow-xl p-6 md:p-8 transform transition-all duration-300 scale-100 opacity-100">
            {/* Header */}
            <h2 className="text-2xl font-bold text-green-700 mb-1">
              Confirm Interest
            </h2>
            <p className="text-sm text-gray-600 mb-5">
              Please enter your number to continue.
            </p>

            {/* Input */}
            <input
              type="tel"
              maxLength={10}
              value={phoneNumber}
              placeholder="e.g. 9876543210"
              onChange={(e) => {
                const onlyDigits = e.target.value.replace(/\D/g, "");
                setPhoneNumber(onlyDigits);
              }}
              className="w-full px-4 py-2 border border-green-300 rounded-lg text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition duration-200"
            />

            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setPhoneNumber("");
                  setIsPhoneDialogOpen(false);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-green-600 transition"
              >
                Cancel
              </button>

              <button
                onClick={handlePhoneSubmit}
                className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg shadow hover:shadow-lg hover:scale-105 transition-transform duration-200"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceActionCard;
