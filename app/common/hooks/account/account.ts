import { useState } from "react";

import { useOtpHandler } from "./otp";
import { useNumberHandler } from "./number";

export const useSettingNumberVerificationFlow = () => {
  const { handleReGenerateOtp } = useOtpHandler();
  const { handleNumberVerification } = useNumberHandler();

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
    const response = await handleNumberVerification(phoneNumber, otp);

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
    handleReGenerateOtp,
    handlePhoneVerified,
    setIsPhoneDialogOpen,
    handlePhoneSubmitted,
    handleCloseOTPDialog,
    handleClosePhoneDialog,
  };
};
