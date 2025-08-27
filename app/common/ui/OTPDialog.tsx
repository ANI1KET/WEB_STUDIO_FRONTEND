"use client";

import { Shield, X, Phone } from "lucide-react";
import React, { useState, useEffect } from "react";

import {
  InputOTP,
  InputOTPSlot,
  InputOTPGroup,
} from "@/app/components/ui/input-otp";
import { Button } from "@/app/components/ui/button";

interface OTPDialogProps {
  title: string;
  onClose: () => void;
  phoneNumber: string;
  reGenerateNumberOtp: (phoneNumber: string) => Promise<boolean>;
  onVerified: (phoneNumber: string, otp: string) => Promise<boolean>;
}

const OTPDialog: React.FC<OTPDialogProps> = ({
  title,
  onClose,
  onVerified,
  phoneNumber,
  reGenerateNumberOtp,
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

  const handleVerifyOTP = async () => {
    setIsLoading(true);

    const response = await onVerified(phoneNumber, otp);

    if (response) {
      handleClose();
    }

    setIsLoading(false);
  };

  const handleResendOTP = async () => {
    const response = await reGenerateNumberOtp(phoneNumber);

    if (response) {
      setTimeLeft(300);
      setIsExpired(false);
      setOtp("");
    }
  };

  const handleClose = () => {
    setOtp("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        // onClick={handleClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      <div className="relative z-50 w-full max-w-md mx-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 px-6 py-6 text-white relative">
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                <Phone className="h-6 w-6" />
              </div>

              <h2 className="text-xl font-bold">Verify Your Phone</h2>

              <p className="text-sm text-blue-100 mt-1">
                Code sent to {phoneNumber}
              </p>

              <p className="text-xs text-blue-100/80 mt-1">{title} </p>
            </div>
          </div>

          <div className="p-8">
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <label className="text-sm font-semibold text-gray-700 block">
                  Enter 6-Digit Verification Code
                </label>

                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(value) => setOtp(value)}
                  >
                    <InputOTPGroup className="gap-3">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className="h-14 w-14 text-xl font-bold border-2 border-gray-200 focus:border-blue-500 bg-gray-50 rounded-xl shadow-sm"
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

                  {!isExpired && (
                    <p className="text-gray-400">
                      Didn&apos;t receive? Check messages
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
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
                      Verify & Show Interest
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
    </div>
  );
};

export default OTPDialog;
