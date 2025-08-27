import { useToast } from "../use-toast";
import { updateOrSetPassword } from "../../serverAction/account/password";

export const usePasswordHandler = () => {
  const { toast } = useToast();

  const handleUpdateOrSetPassword = async ({
    otp,
    userId,
    newPassword,
    confirmPassword,
  }: {
    otp: string;
    userId: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<boolean> => {
    const { message, success } = await updateOrSetPassword({
      otp,
      userId,
      newPassword,
      confirmPassword,
    });

    toast({
      description: message,
      title: success ? "Account" : "OTP",
      variant: success ? "default" : "destructive",
    });

    return success;
  };

  return {
    handleUpdateOrSetPassword,
  };
};
