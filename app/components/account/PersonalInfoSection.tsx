"use client";

import { Session } from "next-auth";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

import { createOtp } from "@/app/auth/SeverAction";
import { useToast } from "@/app/common/hooks/use-toast";
import { NEPALI_NUMBERS_VALIDATION } from "@/app/lib/constants";
import { updateEmailAndPhone } from "./ServerAction/PersonalInfoSection";

import ProfileAvatar from "./PersonalInfoSection/ProfileAvatar";
import PersonalInfoForm from "./PersonalInfoSection/PersonalInfoForm";
import PersonalInfoHeader from "./PersonalInfoSection/PersonalInfoHeader";
import PersonalInfoActions from "./PersonalInfoSection/PersonalInfoActions";
import OTPVerificationDialog from "./PersonalInfoSection/OTPVerificationDialog";

const PersonalInfoSection = ({ session }: { session: Session | null }) => {
  const { toast } = useToast();
  const { data, update } = useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [showOTPDialog, setShowOTPDialog] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(session?.user.number);

  const handleCancel = () => {
    setPhoneNumber(data?.user.number);
    setIsEditing(false);
  };

  const handleFormChange = (value: string) => {
    setPhoneNumber(value);
  };

  const handleSave = async () => {
    const hasPhoneChanged = data?.user.number !== phoneNumber;

    if (hasPhoneChanged) {
      const isNumberValid = NEPALI_NUMBERS_VALIDATION.test(phoneNumber ?? "");

      if (!isNumberValid) {
        toast({
          title: "Account",
          variant: "destructive",
          description: "Enter the valid number",
        });
        return;
      }

      const { message, success } = await createOtp(phoneNumber as string);

      if (success) setShowOTPDialog(true);

      toast({
        title: "OTP",
        description: message,
        variant: success ? "default" : "destructive",
      });
    }
  };

  const handleVerification = async (
    phoneNumber: string,
    otp: string
  ): Promise<boolean> => {
    const { success, message } = await updateEmailAndPhone(otp, phoneNumber);

    if (success) {
      await update({
        ...data,
        user: {
          ...data?.user,
          number: phoneNumber,
        },
      });

      setIsEditing(false);
    }

    toast({
      title: "Account",
      description: message,
      variant: success ? "default" : "destructive",
    });

    return success;
  };
  return (
    <>
      <div className="bg-white rounded-xl shadow-lg border border-green-100 py-4 px-6">
        <PersonalInfoHeader
          isEditing={isEditing}
          id={session?.user.userId}
          onEditClick={() => setIsEditing(true)}
        />

        <div className="flex flex-col md:flex-row gap-6">
          <ProfileAvatar
            role={session?.user.role}
            name={session?.user.name}
            image={session?.user.image}
          />

          <PersonalInfoForm
            isEditing={isEditing}
            name={session?.user.name}
            phoneNumber={phoneNumber}
            email={session?.user.email}
            onFormChange={handleFormChange}
          />
        </div>

        <PersonalInfoActions
          onSave={handleSave}
          isEditing={isEditing}
          onCancel={handleCancel}
        />
      </div>

      {showOTPDialog && (
        <OTPVerificationDialog
          onVerified={handleVerification}
          phoneNumber={phoneNumber as string}
          onClose={() => {
            setShowOTPDialog(false);
          }}
        />
      )}
    </>
  );
};

export default PersonalInfoSection;
