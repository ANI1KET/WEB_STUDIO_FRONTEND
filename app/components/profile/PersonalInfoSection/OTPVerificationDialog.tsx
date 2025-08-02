"use client";

import React, { useState } from "react";
import { Shield, X, Mail, Phone } from "lucide-react";

import { useToast } from "@/app/common/hooks/use-toast";

import {
  InputOTP,
  InputOTPSlot,
  InputOTPGroup,
} from "@/app/components/ui/input-otp";
import { Button } from "@/app/components/ui/button";

interface OTPVerificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  value: {
    phoneNumber: string | undefined;
    email: string | null | undefined;
  };
  field: ("email" | "phoneNumber")[];
  onVerified: (currentField: "email" | "phoneNumber") => void;
}

const OTPVerificationDialog: React.FC<OTPVerificationDialogProps> = ({
  field,
  value,
  isOpen,
  onClose,
  onVerified,
}) => {
  const { toast } = useToast();

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const currentField = field[0];

  if (!isOpen || field.length === 0) return null;

  const handleClose = () => {
    setOtp("");
    onClose();
  };

  const handleVerifyOTP = async () => {
    try {
      setIsLoading(true);

      if (currentField === "email") {
        console.log("email");
      } else if (currentField === "phoneNumber") {
        console.log("number");
      }

      onVerified(currentField);

      toast({
        title: "OTP",
        description: `Your ${
          currentField === "email" ? value.email : value.phoneNumber
        } has been verified.`,
      });

      setIsLoading(false);

      if (field.length !== 0) {
        setOtp("");
      } else {
        handleClose();
      }
    } catch (error) {
      toast({
        title: "OTP",
        variant: "destructive",
        description: "OTP verification failed",
      });

      console.error(error);
    }
  };

  const handleResendOTP = async () => {
    try {
      if (currentField === "email") {
        console.log("email");
      } else if (currentField === "phoneNumber") {
        console.log("number");
      }

      toast({
        title: "OTP",
        description: `A new code has been sent to your ${
          currentField === "email" ? value.email : value.phoneNumber
        }.`,
      });
    } catch (error) {
      toast({
        title: "OTP",
        variant: "destructive",
        description: "Failed to Resend OTP",
      });

      console.error(error);
    }
  };

  const getFieldLabel = () =>
    currentField === "email" ? "Email" : "Phone Number";
  const getDisplayValue = () =>
    currentField === "email" ? value.email : value.phoneNumber;
  const getIcon = () => (currentField === "email" ? <Mail /> : <Phone />);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />

      {/* Dialog */}
      <div className="relative z-50 w-full max-w-xs">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2 text-white relative">
            <button
              onClick={handleClose}
              className="absolute right-2 top-2 text-white/80 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center">
              <div className="h-8 w-8 mx-auto mb-1">{getIcon()}</div>

              <h2 className="text-lg font-semibold">
                Verify Your {getFieldLabel()}
              </h2>

              <p className="text-sm text-green-100 mt-1">
                Code sent to {getDisplayValue()}
              </p>
            </div>
          </div>

          <div className="p-4 space-y-4">
            <div className="text-center space-y-4">
              <label className="text-sm font-semibold text-gray-700 block">
                Enter 6-Digit Verification Code
              </label>

              <div className="flex justify-center">
                <InputOTP
                  value={otp}
                  maxLength={6}
                  onChange={(value) => setOtp(value)}
                >
                  <InputOTPGroup className="gap-3">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className="h-10 w-10 text-xl font-bold border-2 border-gray-200 focus:border-green-500 bg-gray-50 rounded-xl shadow-sm"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleVerifyOTP}
                disabled={isLoading || otp.length !== 6}
                className="w-full h-12 bg-gradient-to-r from-green-300 to-emerald-300 hover:from-green-400 hover:to-emerald-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Verifying...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    {field.length > 1 ? "Verify & Update" : "Verify & Continue"}
                  </div>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={handleResendOTP}
                className="w-full h-10 border-green-200 text-green-700 hover:bg-green-50"
              >
                Resend Code
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationDialog;
