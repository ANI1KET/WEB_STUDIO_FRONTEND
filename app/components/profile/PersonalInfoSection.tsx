"use client";

import { Session } from "next-auth";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

import { useToast } from "@/app/common/hooks/use-toast";
import { updateEmailAndPhone } from "./ServerAction/PersonalInfoSection";

import ProfileAvatar from "./PersonalInfoSection/ProfileAvatar";
import PersonalInfoForm from "./PersonalInfoSection/PersonalInfoForm";
import PersonalInfoHeader from "./PersonalInfoSection/PersonalInfoHeader";
import PersonalInfoActions from "./PersonalInfoSection/PersonalInfoActions";
// import OTPVerificationDialog from "./PersonalInfoSection/OTPVerificationDialog";

const PersonalInfoSection = ({ session }: { session: Session | null }) => {
  const { toast } = useToast();
  const { data, update } = useSession();

  const [formData, setFormData] = useState({
    email: session?.user.email,
    phoneNumber: session?.user.number,
  });
  const [isEditing, setIsEditing] = useState(false);
  // const [showOTPDialog, setShowOTPDialog] = useState(false);
  // const [verificationQueue, setVerificationQueue] = useState<
  //   ("email" | "phoneNumber")[]
  // >([]);

  const handleCancel = () => {
    setFormData({
      email: session?.user.email,
      phoneNumber: session?.user.number,
    });
    setIsEditing(false);
  };

  const handleFormChange = (field: "email" | "phoneNumber", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const hasEmailChanged = data?.user.email !== formData.email;
    const hasPhoneChanged = data?.user.number !== formData.phoneNumber;

    if (hasEmailChanged || hasPhoneChanged) {
      if (hasPhoneChanged && formData.phoneNumber?.length !== 10) {
        toast({
          title: "Account",
          variant: "destructive",
          description: "Please enter the correct number",
        });
        return;
      }

      try {
        await updateEmailAndPhone(formData);

        await update({
          ...data,
          user: {
            ...data?.user,
            email: formData.email,
            number: formData.phoneNumber,
          },
        });
      } catch (error) {
        toast({
          title: "Error",
          variant: "destructive",
          description: "Failed to update your information. Please try again.",
        });
        console.log(error);
      }
    }

    // if (hasEmailChanged || hasPhoneChanged) {
    //   if (hasPhoneChanged && formData.phoneNumber?.length !== 10) {
    //     toast({
    //       title: "Account",
    //       variant: "destructive",
    //       description: "Please enter the correct number",
    //     });
    //     return;
    //   }

    //   const queue: ("email" | "phoneNumber")[] = [];
    //   if (hasEmailChanged) queue.push("email");
    //   if (hasPhoneChanged) queue.push("phoneNumber");
    //   setVerificationQueue(queue);

    //   setShowOTPDialog(true);
    // } else {
    setIsEditing(false);
    // }
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
            email={formData.email}
            name={session?.user.name}
            onFormChange={handleFormChange}
            phoneNumber={formData.phoneNumber}
          />
        </div>

        <PersonalInfoActions
          onSave={handleSave}
          isEditing={isEditing}
          onCancel={handleCancel}
        />
      </div>

      {/* <OTPVerificationDialog
        value={formData}
        isOpen={showOTPDialog}
        field={verificationQueue}
        onClose={() => {
          setShowOTPDialog(false);
          setVerificationQueue([]);
        }}
        onVerified={async (currentField: "email" | "phoneNumber") => {
          setVerificationQueue((prev) =>
            prev.filter((field) => field !== currentField)
          );
          if (verificationQueue.length === 1) setIsEditing(false);

          if (currentField === "email") {
            await update({
              ...session,
              user: {
                ...session?.user,
                email: formData.email,
              },
            });
          } else {
            await update({
              ...session,
              user: {
                ...session?.user,
                number: formData.phoneNumber,
              },
            });
          }
        }}
      /> */}
    </>
  );
};

export default PersonalInfoSection;
