"use client";

import { Session } from "next-auth";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Share2, GitCompare } from "lucide-react";

import { canShowInterest } from "@/app/common/config/authorization";

import { Button } from "@/app/components/ui/button";
import PhoneNumberDialog from "./PriceActionCard/PhoneNumberDialog";
import InterestOTPDialog from "./PriceActionCard/InterestOTPDialog";

interface PriceActionCardProps {
  price: number;
  onShare: () => void;
  onCompare: () => void;
  session: Session | null;
  onShowInterest: () => Promise<void>;
  generateOtp: (phoneNumber: string) => Promise<void>;
  verifyContact: (phoneNumber: string, otp: string) => Promise<boolean>;
}

const PriceActionCard: React.FC<PriceActionCardProps> = ({
  price,
  session,
  onShare,
  onCompare,
  generateOtp,
  verifyContact,
  onShowInterest,
}) => {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOTPDialogOpen, setIsOTPDialogOpen] = useState(false);
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);

  const handleInterestClick = async () => {
    if (!session?.user.number) {
      setIsPhoneDialogOpen(true);
    } else {
      await onShowInterest();
    }
  };

  const handlePhoneSubmitted = () => {
    setIsOTPDialogOpen(true);
  };

  const handleClosePhoneDialog = () => {
    setIsPhoneDialogOpen(false);
  };

  const handleCloseOTPDialog = () => {
    setIsOTPDialogOpen(false);
  };

  const handlePhoneVerified = async (
    phoneNumber: string,
    otp: string
  ): Promise<boolean> => {
    const response = await verifyContact(phoneNumber, otp);

    if (response) {
      setPhoneNumber("");
    }

    return response;
  };

  return (
    <div className="lg:min-w-[340px] bg-gradient-to-br from-white via-green-50/30 to-white">
      <div className="text-center mb-6 p-2 bg-white/50 rounded-2xl border border-green-100 shadow-sm backdrop-blur-xl hover:shadow-2xl transition-all duration-500">
        <div className="text-5xl font-extrabold bg-gradient-to-r from-green-600 via-emerald-500 to-green-500 bg-clip-text text-transparent my-1 tracking-tighter">
          ₹ {price.toLocaleString()}
        </div>

        <div className="text-gray-500 text-sm font-medium">per month</div>
      </div>

      <div className="flex flex-col gap-3">
        {session ? (
          <>
            {canShowInterest(session.user.role) && (
              <Button
                size="lg"
                onClick={handleInterestClick}
                className="w-full bg-gradient-to-r from-green-300 to-emerald-400 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] active:scale-100 font-bold"
              >
                <div className="p-2 bg-white/20 rounded-2xl hover:bg-white/30 transition-colors">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <span className="ml-2 relative">I&apos;m Interested</span>
              </Button>
            )}
          </>
        ) : (
          <Button
            size="lg"
            onClick={() => router.push("/auth/login")}
            className="w-full bg-gradient-to-r from-green-300 to-emerald-400 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] active:scale-100 font-bold group"
          >
            <div className="p-2 bg-white/20 rounded-2xl hover:bg-white/30 transition-colors">
              <Heart className="h-5 w-5 text-white" />
            </div>

            <span className="ml-2 relative">
              <span className="block group-hover:hidden">
                I&apos;m Interested
              </span>

              <span className="hidden group-hover:block">Login to proceed</span>
            </span>
          </Button>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Button
            size="lg"
            onClick={onShare}
            className="w-full bg-gradient-to-r from-green-300 to-emerald-400 hover:shadow-xl transition-all duration-300 hover:scale-[1.03] active:scale-100 font-semibold"
          >
            <div className="p-2 bg-green-100 rounded-2xl hover:bg-green-200 transition-colors">
              <Share2 className="h-4 w-4 text-green-600" />
            </div>
            Share
          </Button>

          <Button
            size="lg"
            onClick={onCompare}
            className="w-full bg-gradient-to-r from-green-300 to-emerald-400 hover:shadow-xl transition-all duration-300 hover:scale-[1.03] active:scale-100 font-semibold"
          >
            <div className="p-2 bg-green-100 rounded-2xl hover:bg-green-200 transition-colors">
              <GitCompare className="h-4 w-4 text-green-600" />
            </div>
            Compare
          </Button>
        </div>
      </div>

      {isPhoneDialogOpen && (
        <PhoneNumberDialog
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          onClose={handleClosePhoneDialog}
          onPhoneSubmitted={handlePhoneSubmitted}
        />
      )}

      {isOTPDialogOpen && (
        <InterestOTPDialog
          phoneNumber={phoneNumber}
          generateOtp={generateOtp}
          onClose={handleCloseOTPDialog}
          onShowInterest={onShowInterest}
          onVerified={handlePhoneVerified}
        />
      )}
    </div>
  );
};

export default PriceActionCard;
