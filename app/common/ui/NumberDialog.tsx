"use cleint";

import React, { useState } from "react";
import { Phone, X, ArrowRight } from "lucide-react";

import { useOtpHandler } from "../hooks/account/otp";
import { useToast } from "@/app/common/hooks/use-toast";
import { NEPALI_NUMBERS_VALIDATION } from "@/app/lib/constants";

import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

interface NumberDialogProps {
  title: string;
  onClose: () => void;
  phoneNumber: string;
  onPhoneSubmitted: () => void;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
}

const NumberDialog: React.FC<NumberDialogProps> = ({
  title,
  onClose,
  phoneNumber,
  setPhoneNumber,
  onPhoneSubmitted,
}) => {
  const { toast } = useToast();
  const { handleCreateNumberOtp } = useOtpHandler();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!NEPALI_NUMBERS_VALIDATION.test(phoneNumber)) {
      toast({
        title: "Phone Number",
        variant: "destructive",
        description: "Please enter a valid mobile number",
      });
      return;
    }

    setIsLoading(true);

    const response = await handleCreateNumberOtp(phoneNumber);

    if (response) {
      setIsLoading(false);
      onClose();
      onPhoneSubmitted();
    }

    setIsLoading(false);
  };

  const handleClose = () => {
    setPhoneNumber("");
    setIsLoading(false);
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

              <h2 className="text-xl font-bold">Add Phone Number</h2>

              <p className="text-sm text-blue-100 mt-1">{title}</p>
            </div>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <label className="text-sm font-semibold text-gray-700 block">
                  Mobile Number
                </label>

                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center">
                    <span className="text-gray-500 text-sm font-medium">
                      +977
                    </span>
                  </div>

                  <Input
                    type="tel"
                    value={phoneNumber}
                    disabled={isLoading}
                    placeholder="Enter 10-digit mobile number"
                    onChange={(e) =>
                      setPhoneNumber(
                        e.target.value.replace(/\D/g, "").slice(0, 10)
                      )
                    }
                    className="pl-12 h-12 text-base border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                  />
                </div>

                <p className="text-xs text-gray-500">
                  We&apos;ll send you a verification code to confirm your number
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  type="submit"
                  disabled={isLoading || phoneNumber.length !== 10}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Sending OTP...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <ArrowRight className="h-5 w-5" />
                      Send Verification Code
                    </div>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  disabled={isLoading}
                  onClick={handleClose}
                  className="w-full h-10 text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberDialog;
