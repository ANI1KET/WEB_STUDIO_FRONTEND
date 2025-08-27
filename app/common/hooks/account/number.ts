import { useSession } from "next-auth/react";

import { useToast } from "../use-toast";
import { setNumber } from "../../serverAction/account/number";

export const useNumberHandler = () => {
  const { toast } = useToast();
  const { data: session, update } = useSession();

  const handleSetNumberVerification = async (
    phoneNumber: string,
    otp: string
  ): Promise<boolean> => {
    const { message, success } = await setNumber({
      otp,
      number: phoneNumber,
      userId: session?.user.userId as string,
    });

    if (success) {
      await update({
        ...session,
        user: {
          ...session?.user,
          number: phoneNumber,
        },
      });
    }

    toast({
      title: "Account",
      description: message,
      variant: success ? "default" : "destructive",
    });

    return success;
  };

  return {
    handleSetNumberVerification,
  };
};
