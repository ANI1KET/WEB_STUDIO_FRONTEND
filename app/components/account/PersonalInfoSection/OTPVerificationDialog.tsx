"use client";

import { X, Phone, Shield } from "lucide-react";
import React, { useState, useEffect } from "react";

import { generateOtp } from "../../selected/room/ServerAction/RoomPageLayout";

import {
  InputOTP,
  InputOTPSlot,
  InputOTPGroup,
} from "@/app/components/ui/input-otp";
import { Button } from "@/app/components/ui/button";

interface OTPVerificationDialogProps {
  onClose: () => void;
  phoneNumber: string;
  onVerified: (phoneNumber: string, otp: string) => Promise<boolean>;
}

const OTPVerificationDialog: React.FC<OTPVerificationDialogProps> = ({
  onClose,
  onVerified,
  phoneNumber,
}) => {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleClose = () => {
    setOtp("");
    onClose();
  };

  const handleVerifyOTP = async () => {
    setIsLoading(true);

    const response = await onVerified(phoneNumber, otp);

    if (response) handleClose();

    setIsLoading(false);
  };

  const handleResendOTP = async () => {
    const { success } = await generateOtp({ number: phoneNumber });

    if (success) {
      setTimeLeft(300);
      setIsExpired(false);
    }

    setOtp("");
  };

  return (
    <div className="fixed inset-0 -top-8 z-50 flex items-center justify-center">
      <div
        // onClick={handleClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      <div className="relative z-50 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white relative">
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="py-3 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                <Phone className="h-6 w-6" />
              </div>

              <h2 className="text-xl font-bold">Verify Your Phone</h2>

              <p className="text-sm text-blue-100 mt-1">
                Code sent to {phoneNumber}
              </p>
            </div>
          </div>

          <div className="px-4">
            <div className="flex flex-col gap-2 py-2 text-center">
              <label className="text-sm font-semibold text-gray-700 block">
                Enter 6-Digit Verification Code
              </label>

              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                >
                  <InputOTPGroup className="gap-2">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className="h-12 w-12 sm:w-14 sm:h-14 text-xl font-bold border-2 border-gray-200 focus:border-blue-500 bg-gray-50 rounded-xl shadow-sm"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="flex items-center justify-between text-sm">
                <p className="text-gray-500">
                  {isExpired ? (
                    <span className="text-red-600 font-medium">
                      Code expired
                    </span>
                  ) : (
                    `Code expires in ${formatTime(timeLeft)}`
                  )}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 py-2">
              <Button
                onClick={handleVerifyOTP}
                disabled={isLoading || otp.length !== 6}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Verifying...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Verify & Update
                  </div>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={handleResendOTP}
                disabled={isLoading || !isExpired}
                className="w-full h-10 border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                {isExpired
                  ? "Resend Code"
                  : `Resend in ${formatTime(timeLeft)}s`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationDialog;
