import { useEffect, useRef, useState } from "react";

import {
  EMAIL_VALIDATION,
  OTP_EXPIRATION_TIME,
  NEPALI_NUMBERS_VALIDATION,
} from "@/app/lib/constants";
import { useOtpHandler } from "./otp";
import { useToast } from "../use-toast";
import { useNumberHandler } from "./number";
import { usePasswordHandler } from "./password";

export const useSettingNumberVerificationFlow = () => {
  const { handleReGenerateNumberOtp } = useOtpHandler();
  const { handleSetNumberVerification } = useNumberHandler();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOTPDialogOpen, setIsOTPDialogOpen] = useState(false);
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);

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
    const response = await handleSetNumberVerification(phoneNumber, otp);

    if (response) {
      setPhoneNumber("");
    }

    return response;
  };

  return {
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
  };
};

export const useSetOrUpdateNumberVerificationFlow = () => {
  const { handlecreateEmailOrNumberOtp } = useOtpHandler();
  const { handleUpdateOrSetPassword } = usePasswordHandler();

  const { toast } = useToast();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<
    "email/number" | "verification"
  >("email/number");
  const [emailOrPhone, setEmailOrPhone] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [contactMethod, setContactMethod] = useState<"email" | "phone">(
    "email"
  );

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) {
      setCurrentStep("verification");
      return;
    }

    const isValid =
      contactMethod === "phone"
        ? NEPALI_NUMBERS_VALIDATION.test(emailOrPhone)
        : EMAIL_VALIDATION.test(emailOrPhone);

    if (!isValid) {
      toast({
        variant: "destructive",
        description:
          contactMethod === "phone"
            ? "Enter a valid phone number"
            : "Enter a valid email address",
        title: contactMethod === "phone" ? "Invalid Number" : "Invalid Email",
      });
      return;
    }

    setLoading(true);

    const response = await handlecreateEmailOrNumberOtp(emailOrPhone);

    if (response) {
      setUserId(userId);
      setCurrentStep("verification");
      timeoutRef.current = setTimeout(
        () => setLoading(false),
        OTP_EXPIRATION_TIME * 1000
      );
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return {
    userId,
    loading,
    currentStep,
    emailOrPhone,
    contactMethod,
    showNewPassword,
    showConfirmPassword,
    handleSendOTP,
    setCurrentStep,
    setEmailOrPhone,
    setContactMethod,
    setShowNewPassword,
    setShowConfirmPassword,
    handleUpdateOrSetPassword,
  };
};
