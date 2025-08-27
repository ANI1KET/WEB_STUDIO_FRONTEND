import {
  createNumberOtp,
  reGenerateNumberOtp,
  createEmailOrNumberOtp,
} from "../../serverAction/account/otp";
import { useToast } from "../use-toast";

export const useOtpHandler = () => {
  const { toast } = useToast();

  const handleCreateNumberOtp = async (
    phoneNumber: string
  ): Promise<boolean> => {
    const { message, success } = await createNumberOtp(phoneNumber);

    toast({
      title: "OTP",
      description: message,
      variant: success ? "default" : "destructive",
    });

    return success;
  };

  const handleReGenerateNumberOtp = async (
    phoneNumber: string
  ): Promise<boolean> => {
    const { message, success } = await reGenerateNumberOtp({
      number: phoneNumber,
    });

    toast({
      title: "OTP",
      description: message,
      variant: success ? "default" : "destructive",
    });

    return success;
  };

  const handlecreateEmailOrNumberOtp = async (
    emailOrPhone: string
  ): Promise<boolean> => {
    const { userId, message } = await createEmailOrNumberOtp(emailOrPhone);

    toast({
      title: "OTP",
      description: message,
      variant: userId ? "default" : "destructive",
    });

    return !!userId;
  };

  return {
    handleCreateNumberOtp,
    handleReGenerateNumberOtp,
    handlecreateEmailOrNumberOtp,
  };
};
