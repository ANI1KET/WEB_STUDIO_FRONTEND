"use client";

import React, { useState } from "react";
import { Shield, X, Phone, ArrowLeft } from "lucide-react";

import { SignUpFormData } from "@/app/auth/Schema";
import { createUser } from "@/app/auth/SeverAction";
import { useToast } from "@/app/common/hooks/use-toast";

import {
  InputOTP,
  InputOTPSlot,
  InputOTPGroup,
} from "@/app/components/ui/input-otp";
import { Button } from "@/app/components/ui/button";

interface SignupOTPDialogProps {
  isOpen: boolean;
  timeLeft: number;
  isOtpSet: boolean;
  onClose: () => void;
  onVerified: () => void;
  signUpData: SignUpFormData;
}

const SignupOTPDialog: React.FC<SignupOTPDialogProps> = ({
  isOpen,
  onClose,
  timeLeft,
  isOtpSet,
  signUpData,
  onVerified,
}) => {
  const { toast } = useToast();

  const [otp, setOtp] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const formatTime = (seconds: number) => {
    const secs = seconds % 60;
    const mins = Math.floor(seconds / 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleVerifyOTP = async () => {
    setIsLoading(true);

    const { success, message } = await createUser(otp, signUpData);

    if (success) {
      handleClose();
      onVerified();
    }
    setIsLoading(false);

    toast({
      description: message,
      title: success ? "Account" : "OTP",
      variant: success ? "default" : "destructive",
    });
  };

  const handleClose = () => {
    setOtp("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative z-50 w-full max-w-md mx-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-6 text-white relative">
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
                Code sent to {signUpData.number}
              </p>

              <p className="text-xs text-blue-100/80 mt-1">
                Complete your signup to join AfnoSansaar
              </p>
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
                    {isOtpSet ? (
                      `Code expires in ${formatTime(timeLeft)}`
                    ) : (
                      <span className="text-red-600 font-semibold">
                        Your code has expired. Please generate a new one.
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleVerifyOTP}
                  disabled={isLoading || otp.length !== 6}
                  className="w-full h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Creating Account...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Verify & Create Account
                    </div>
                  )}
                </Button>

                <Button
                  variant="ghost"
                  disabled={isLoading}
                  onClick={handleClose}
                  className="w-full h-10 text-gray-500 hover:text-gray-700"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Signup
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupOTPDialog;
