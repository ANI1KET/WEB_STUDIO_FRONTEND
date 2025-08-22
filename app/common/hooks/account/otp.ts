import { useToast } from "../use-toast";
import { reGenerateOtp } from "../../serverAction/account/otp";

export const useOtpHandler = () => {
  const { toast } = useToast();

  const handleReGenerateOtp = async (phoneNumber: string) => {
    const { message, success } = await reGenerateOtp({
      number: phoneNumber,
    });

    toast({
      title: "OTP",
      description: message,
      variant: success ? "default" : "destructive",
    });
  };

  return {
    handleReGenerateOtp,
  };
};
